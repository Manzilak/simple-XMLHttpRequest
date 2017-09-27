/*
 * ~ 0.2 Alpha
 * 
 * Copyright (C) 2017 Abdullah Alghamdi - All Rights Reserved
 * 
 * You can use this code based on the licenes attaached in README file
 * If you have any question, you can reach me at
 * codingride@gmail.com
 */

'use strict';

function xBuffer(settings) {
    // Initiate required settings
    this.xBuffer = new XMLHttpRequest();
    this.method = settings.method;
    this.link = settings.api;
    this.contentFormat = settings.contentFormat;

    this.params = settings.params;
    this.send = settings.params.send;
    
    // Fire request
    this.sendRequest();
}

xBuffer.prototype.createBase = function() {

    var base = '';

    for(var key in this.params) {
        if(key === 'user') {
            base +=  this.params[key] + '/';
        } else if(key === 'project') {
            base += this.params[key] + '/';
        }
    }
    
    if(base === '' || typeof base === 'undefind') {
        return 'Error!';
    } else {
        return base;
    }
    
}

// Prepare params as JSON if POST request or string as GET request
xBuffer.prototype.prepareRequest = function() {
    
    var params = '';

    switch (this.method) {
        case 'GET':
            
            if(this.send === '' || typeof this.send === 'undefind') {
                params = 'Error!';
            } else {
                params += '?';
                // Loop thought JSON
                for(var k in this.send) {
                    if(k === 'token') {
                        base += 'token=' + this.send[k];
                    }
                    params += k + '=' + this.send[k] + '&';
                }
            }
            
            return params;

            break;
        case 'POST':

            // Send as JSON
            if(this.send === '' || typeof this.send === 'undefind') {
                params =  'Error!';
            } else {
                params = JSON.stringify(this.send);
            }

            return params;

            break;
        default:
            return 'Error';
            break;
    }

    var me = JSON.stringify({params});

    //console.log(this.params);
}

xBuffer.prototype.getResponse = function() {
    var request = this.xBuffer;
    
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            console.log(request.responseText);
        }
    }
}

xBuffer.prototype.sendRequest = function() {

    var paramsBase = this.createBase();
    var paramsData = this.prepareRequest();

    switch (this.method) {
        case 'GET':
            
            this.xBuffer.open(this.method, this.link + paramsBase + paramsData, true);
            this.xBuffer.send();

            break;
        case 'POST':
            
            this.xBuffer.open(this.method, this.link + paramsBase, true);
            this.xBuffer.setRequestHeader('Content-Type', this.contentFormat);
            this.xBuffer.send(paramsData);
            break;
        default:
            // Use GET method
            this.xBuffer.open(this.method, this.link + paramsBase + paramsData, true);
            this.xBuffer.send();

            break;
    }
}

export default xBuffer;