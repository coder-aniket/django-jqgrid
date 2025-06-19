/**
 * Django JQGrid Security Manager
 * Handles authentication, CSRF tokens, and security headers for all AJAX requests
 */

window.jqGridSecurity = window.jqGridSecurity || {
    // Global security configuration
    config: {
        // Authentication method: 'session', 'token', 'jwt', 'custom'
        authMethod: 'session',
        
        // CSRF configuration
        csrf: {
            enabled: true,
            tokenName: 'csrftoken',
            headerName: 'X-CSRFToken',
            cookieName: 'csrftoken',
            metaName: 'csrf-token'
        },
        
        // Token-based authentication
        token: {
            enabled: false,
            type: 'Bearer', // 'Bearer', 'Token', 'API-Key', etc.
            headerName: 'Authorization',
            tokenKey: 'auth_token', // localStorage/sessionStorage key
            storage: 'localStorage' // 'localStorage', 'sessionStorage', 'cookie'
        },
        
        // JWT configuration
        jwt: {
            enabled: false,
            headerName: 'Authorization',
            tokenKey: 'jwt_token',
            storage: 'localStorage',
            refreshTokenKey: 'refresh_token',
            autoRefresh: true,
            refreshEndpoint: '/api/auth/refresh/'
        },
        
        // Custom security headers
        customHeaders: {
            // Example: 'X-API-Version': '1.0',
            // Example: 'X-Client-Type': 'jqgrid'
        },
        
        // Session management
        session: {
            enabled: true,
            checkEndpoint: '/api/auth/check/',
            loginRedirect: '/login/',
            autoCheck: true,
            checkInterval: 300000 // 5 minutes
        },
        
        // Security callbacks
        callbacks: {
            onUnauthorized: null,
            onForbidden: null,
            onTokenExpired: null,
            onSecurityError: null,
            beforeRequest: null,
            afterRequest: null
        }
    },

    /**
     * Initialize security system
     */
    init: function(customConfig) {
        // Merge custom configuration
        if (customConfig) {
            this.config = $.extend(true, this.config, customConfig);
        }

        // Auto-detect authentication method if not specified
        if (this.config.authMethod === 'auto') {
            this.config.authMethod = this.detectAuthMethod();
        }

        // Setup AJAX defaults
        this.setupAjaxDefaults();

        // Start session monitoring if enabled
        if (this.config.session.enabled && this.config.session.autoCheck) {
            this.startSessionMonitoring();
        }

        console.log('JQGrid Security initialized with method:', this.config.authMethod);
    },

    /**
     * Auto-detect authentication method based on available tokens/cookies
     */
    detectAuthMethod: function() {
        // Check for JWT token
        if (this.getStoredValue(this.config.jwt.tokenKey, this.config.jwt.storage)) {
            return 'jwt';
        }
        
        // Check for API token
        if (this.getStoredValue(this.config.token.tokenKey, this.config.token.storage)) {
            return 'token';
        }
        
        // Check for CSRF token (indicates session-based)
        if (this.getCSRFToken()) {
            return 'session';
        }
        
        // Default to session
        return 'session';
    },

    /**
     * Setup jQuery AJAX defaults with security headers
     */
    setupAjaxDefaults: function() {
        var self = this;
        
        $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                // Apply security configuration before each request
                self.applySecurityHeaders(xhr, settings);
                
                // Call custom beforeRequest callback
                if (typeof self.config.callbacks.beforeRequest === 'function') {
                    self.config.callbacks.beforeRequest(xhr, settings);
                }
            },
            
            error: function(xhr, status, error) {
                // Handle security-related errors
                self.handleSecurityError(xhr, status, error);
            },
            
            complete: function(xhr, status) {
                // Call custom afterRequest callback
                if (typeof self.config.callbacks.afterRequest === 'function') {
                    self.config.callbacks.afterRequest(xhr, status);
                }
            }
        });
    },

    /**
     * Apply appropriate security headers based on configuration
     */
    applySecurityHeaders: function(xhr, settings) {
        // Skip if not a state-changing request and CSRF not required for GET
        var isStateChanging = !(/^(GET|HEAD|OPTIONS|TRACE)$/.test(settings.type));
        
        // Apply CSRF token for session-based authentication
        if (this.config.authMethod === 'session' && this.config.csrf.enabled) {
            if (isStateChanging || this.config.csrf.alwaysInclude) {
                var csrfToken = this.getCSRFToken();
                if (csrfToken) {
                    xhr.setRequestHeader(this.config.csrf.headerName, csrfToken);
                }
            }
        }
        
        // Apply token-based authentication
        if (this.config.authMethod === 'token' && this.config.token.enabled) {
            var token = this.getAuthToken();
            if (token) {
                var headerValue = this.config.token.type ? 
                    this.config.token.type + ' ' + token : token;
                xhr.setRequestHeader(this.config.token.headerName, headerValue);
            }
        }
        
        // Apply JWT authentication
        if (this.config.authMethod === 'jwt' && this.config.jwt.enabled) {
            var jwtToken = this.getJWTToken();
            if (jwtToken) {
                xhr.setRequestHeader(this.config.jwt.headerName, 'Bearer ' + jwtToken);
            }
        }
        
        // Apply custom headers
        for (var headerName in this.config.customHeaders) {
            if (this.config.customHeaders.hasOwnProperty(headerName)) {
                xhr.setRequestHeader(headerName, this.config.customHeaders[headerName]);
            }
        }
    },

    /**
     * Get CSRF token from various sources
     */
    getCSRFToken: function() {
        var token = null;
        
        // Try to get from cookie
        token = this.getCookie(this.config.csrf.cookieName);
        if (token) return token;
        
        // Try to get from meta tag
        var metaTag = document.querySelector('meta[name="' + this.config.csrf.metaName + '"]');
        if (metaTag) {
            token = metaTag.getAttribute('content');
            if (token) return token;
        }
        
        // Try to get from Django's default location
        token = this.getCookie('csrftoken');
        if (token) return token;
        
        // Try to get from hidden input
        var hiddenInput = document.querySelector('input[name="csrfmiddlewaretoken"]');
        if (hiddenInput) {
            return hiddenInput.value;
        }
        
        return null;
    },

    /**
     * Get authentication token
     */
    getAuthToken: function() {
        return this.getStoredValue(this.config.token.tokenKey, this.config.token.storage);
    },

    /**
     * Get JWT token
     */
    getJWTToken: function() {
        var token = this.getStoredValue(this.config.jwt.tokenKey, this.config.jwt.storage);
        
        // Check if token is expired and refresh if needed
        if (token && this.config.jwt.autoRefresh && this.isJWTExpired(token)) {
            this.refreshJWTToken();
            return this.getStoredValue(this.config.jwt.tokenKey, this.config.jwt.storage);
        }
        
        return token;
    },

    /**
     * Check if JWT token is expired
     */
    isJWTExpired: function(token) {
        try {
            var payload = JSON.parse(atob(token.split('.')[1]));
            var currentTime = Math.floor(Date.now() / 1000);
            return payload.exp < currentTime;
        } catch (e) {
            console.warn('Invalid JWT token format');
            return true;
        }
    },

    /**
     * Refresh JWT token
     */
    refreshJWTToken: function() {
        var self = this;
        var refreshToken = this.getStoredValue(this.config.jwt.refreshTokenKey, this.config.jwt.storage);
        
        if (!refreshToken) {
            console.warn('No refresh token available');
            return;
        }

        $.ajax({
            url: this.config.jwt.refreshEndpoint,
            method: 'POST',
            data: { refresh: refreshToken },
            async: false, // Synchronous to ensure token is refreshed before other requests
            success: function(response) {
                if (response.access) {
                    self.setStoredValue(self.config.jwt.tokenKey, response.access, self.config.jwt.storage);
                    if (response.refresh) {
                        self.setStoredValue(self.config.jwt.refreshTokenKey, response.refresh, self.config.jwt.storage);
                    }
                }
            },
            error: function() {
                console.error('Failed to refresh JWT token');
                if (typeof self.config.callbacks.onTokenExpired === 'function') {
                    self.config.callbacks.onTokenExpired();
                }
            }
        });
    },

    /**
     * Get value from storage (localStorage, sessionStorage, or cookie)
     */
    getStoredValue: function(key, storage) {
        try {
            switch (storage) {
                case 'localStorage':
                    return localStorage.getItem(key);
                case 'sessionStorage':
                    return sessionStorage.getItem(key);
                case 'cookie':
                    return this.getCookie(key);
                default:
                    return null;
            }
        } catch (e) {
            console.warn('Failed to get stored value:', e);
            return null;
        }
    },

    /**
     * Set value in storage
     */
    setStoredValue: function(key, value, storage) {
        try {
            switch (storage) {
                case 'localStorage':
                    localStorage.setItem(key, value);
                    break;
                case 'sessionStorage':
                    sessionStorage.setItem(key, value);
                    break;
                case 'cookie':
                    this.setCookie(key, value);
                    break;
            }
        } catch (e) {
            console.warn('Failed to set stored value:', e);
        }
    },

    /**
     * Get cookie value
     */
    getCookie: function(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length === 2) {
            return parts.pop().split(";").shift();
        }
        return null;
    },

    /**
     * Set cookie value
     */
    setCookie: function(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    },

    /**
     * Handle security-related errors
     */
    handleSecurityError: function(xhr, status, error) {
        switch (xhr.status) {
            case 401:
                console.warn('Unauthorized request detected');
                if (typeof this.config.callbacks.onUnauthorized === 'function') {
                    this.config.callbacks.onUnauthorized(xhr, status, error);
                } else {
                    this.handleUnauthorized();
                }
                break;
                
            case 403:
                console.warn('Forbidden request detected');
                if (typeof this.config.callbacks.onForbidden === 'function') {
                    this.config.callbacks.onForbidden(xhr, status, error);
                }
                break;
                
            default:
                if (typeof this.config.callbacks.onSecurityError === 'function') {
                    this.config.callbacks.onSecurityError(xhr, status, error);
                }
        }
    },

    /**
     * Handle unauthorized access
     */
    handleUnauthorized: function() {
        if (this.config.session.loginRedirect) {
            // Redirect to login page
            window.location.href = this.config.session.loginRedirect;
        } else {
            // Show error message
            alert('Your session has expired. Please log in again.');
        }
    },

    /**
     * Start session monitoring
     */
    startSessionMonitoring: function() {
        var self = this;
        
        setInterval(function() {
            self.checkSession();
        }, this.config.session.checkInterval);
    },

    /**
     * Check session validity
     */
    checkSession: function() {
        var self = this;
        
        $.ajax({
            url: this.config.session.checkEndpoint,
            method: 'GET',
            timeout: 5000,
            success: function(response) {
                if (!response.authenticated) {
                    self.handleUnauthorized();
                }
            },
            error: function(xhr) {
                if (xhr.status === 401) {
                    self.handleUnauthorized();
                }
            }
        });
    },

    /**
     * Update security configuration
     */
    updateConfig: function(newConfig) {
        this.config = $.extend(true, this.config, newConfig);
        this.setupAjaxDefaults();
    },

    /**
     * Set authentication token
     */
    setAuthToken: function(token) {
        this.setStoredValue(this.config.token.tokenKey, token, this.config.token.storage);
    },

    /**
     * Set JWT tokens
     */
    setJWTTokens: function(accessToken, refreshToken) {
        this.setStoredValue(this.config.jwt.tokenKey, accessToken, this.config.jwt.storage);
        if (refreshToken) {
            this.setStoredValue(this.config.jwt.refreshTokenKey, refreshToken, this.config.jwt.storage);
        }
    },

    /**
     * Clear all authentication tokens
     */
    clearTokens: function() {
        // Clear token-based auth
        this.setStoredValue(this.config.token.tokenKey, '', this.config.token.storage);
        
        // Clear JWT tokens
        this.setStoredValue(this.config.jwt.tokenKey, '', this.config.jwt.storage);
        this.setStoredValue(this.config.jwt.refreshTokenKey, '', this.config.jwt.storage);
    },

    /**
     * Get current security headers that would be applied
     */
    getSecurityHeaders: function() {
        var headers = {};
        
        // CSRF token
        if (this.config.authMethod === 'session' && this.config.csrf.enabled) {
            var csrfToken = this.getCSRFToken();
            if (csrfToken) {
                headers[this.config.csrf.headerName] = csrfToken;
            }
        }
        
        // Auth token
        if (this.config.authMethod === 'token' && this.config.token.enabled) {
            var token = this.getAuthToken();
            if (token) {
                var headerValue = this.config.token.type ? 
                    this.config.token.type + ' ' + token : token;
                headers[this.config.token.headerName] = headerValue;
            }
        }
        
        // JWT token
        if (this.config.authMethod === 'jwt' && this.config.jwt.enabled) {
            var jwtToken = this.getJWTToken();
            if (jwtToken) {
                headers[this.config.jwt.headerName] = 'Bearer ' + jwtToken;
            }
        }
        
        // Custom headers
        $.extend(headers, this.config.customHeaders);
        
        return headers;
    }
};

// Auto-initialize with default configuration when DOM is ready
$(document).ready(function() {
    // Check if there's a global security configuration
    var globalConfig = window.JQGRID_SECURITY_CONFIG || {};
    
    // Initialize security system
    window.jqGridSecurity.init(globalConfig);
});

// Set global token variable for backward compatibility
window.token = window.jqGridSecurity.getSecurityHeaders();

// Update global token variable whenever it might change
$(document).ajaxComplete(function() {
    window.token = window.jqGridSecurity.getSecurityHeaders();
});