!((e, t) => {
    'object' == typeof exports && 'undefined' != typeof module
      ? (module.exports = t())
      : 'function' == typeof define && define.amd
        ? define(t)
        : ((e = 'undefined' != typeof globalThis ? globalThis : e || self).WTAPI = t())
  })(this, () => {
    const JSJAC_NKEYS = 16,
      JSJAC_INACTIVITY = 300,
      JSJAC_ERR_COUNT = 10,
      JSJAC_ALLOW_PLAIN = !0,
      JSJAC_ALLOW_SCRAM = !1,
      JSJAC_CHECKQUEUEINTERVAL = 100,
      JSJAC_CHECKINQUEUEINTERVAL = 100,
      JSJAC_TIMERVAL = 2e3,
      JSJAC_RETRYDELAY = 5e3,
      JSJAC_REGID_TIMEOUT = 2e4,
      JSJACHBC_MAX_HOLD = 1,
      JSJACHBC_MAX_WAIT = 300,
      JSJACHBC_BOSH_VERSION = '1.10',
      JSJACHBC_MAXPAUSE = 120
    ;(String.prototype.htmlEnc = function () {
      if (!this) return this
      var e = this.replace(/&/g, '&amp;')
      return (e = (e = (e = (e = e.replace(/</g, '&lt;')).replace(/>/g, '&gt;')).replace(
        /"/g,
        '&quot;'
      )).replace(/\n/g, '<br />'))
    }),
      (String.prototype.revertHtmlEnc = function () {
        if (!this) return this
        var e = this.replace(/&amp;/gi, '&')
        return (e = (e = (e = (e = e.replace(/&lt;/gi, '<')).replace(/&gt;/gi, '>')).replace(
          /&quot;/gi,
          '"'
        )).replace(/<br( )?(\/)?>/gi, '\n'))
      }),
      (Date.jab2date = e => {
        var t = new Date(
          Date.UTC(
            e.substr(0, 4),
            e.substr(5, 2) - 1,
            e.substr(8, 2),
            e.substr(11, 2),
            e.substr(14, 2),
            e.substr(17, 2)
          )
        )
        if ('Z' != e.substr(e.length - 6, 1)) {
          var n = new Date()
          n.setTime(0),
            n.setUTCHours(e.substr(e.length - 5, 2)),
            n.setUTCMinutes(e.substr(e.length - 2, 2)),
            '+' == e.substr(e.length - 6, 1)
              ? t.setTime(t.getTime() - n.getTime())
              : '-' == e.substr(e.length - 6, 1) && t.setTime(t.getTime() + n.getTime())
        }
        return t
      }),
      (Date.hrTime = e => Date.jab2date(e).toLocaleString()),
      (Date.prototype.jabberDate = function () {
        var e = e => (e < 10 ? '0' + e : e),
          t = this.getUTCFullYear() + '-'
        return (
          (t += e(this.getUTCMonth() + 1) + '-'),
          (t += e(this.getUTCDate()) + 'T'),
          (t += e(this.getUTCHours()) + ':'),
          (t += e(this.getUTCMinutes()) + ':'),
          (t += e(this.getUTCSeconds()) + 'Z')
        )
      }),
      (Number.max = (e, t) => (e > t ? e : t)),
      (Number.min = (e, t) => (e < t ? e : t)),
      'undefined' != typeof window &&
        window.XDomainRequest &&
        ((window.ieXDRToXHR = e => {
          var t = e.XMLHttpRequest
          ;(e.XMLHttpRequest = function () {
            ;(this.onreadystatechange = Object),
              (this.xhr = null),
              (this.xdr = null),
              (this.readyState = 0),
              (this.status = ''),
              (this.statusText = null),
              (this.responseText = null),
              (this.getResponseHeader = null),
              (this.getAllResponseHeaders = null),
              (this.setRequestHeader = null),
              (this.abort = null),
              (this.send = null),
              (this.isxdr = !1)
  
            ;(this.xdrLoadedBinded = () => {
              this.xdrLoaded()
            }),
              (this.xdrErrorBinded = () => {
                this.xdrError()
              }),
              (this.xdrProgressBinded = () => {
                this.xdrProgress()
              }),
              (this.xhrReadyStateChangedBinded = () => {
                this.xhrReadyStateChanged()
              })
          }),
            (XMLHttpRequest.prototype.open = function (n, i, r, s, o) {
              var a = document.createElement('a')
              ;(a.href = i),
                a.hostname != document.domain
                  ? (null === this.xdr && (this.xdr = new e.XDomainRequest()),
                    (this.isxdr = !0),
                    this.setXDRActive(),
                    this.xdr.open(n, i))
                  : (null === this.xhr && (this.xhr = new t()),
                    (this.isxdr = !1),
                    this.setXHRActive(),
                    this.xhr.open(n, i, r, s, o))
            }),
            (XMLHttpRequest.prototype.xdrGetResponseHeader = function (e) {
              return 'Content-Type' === e && this.xdr.contentType > '' ? this.xdr.contentType : ''
            }),
            (XMLHttpRequest.prototype.xdrGetAllResponseHeaders = function () {
              return this.xdr.contentType > '' ? 'Content-Type: ' + this.xdr.contentType : ''
            }),
            (XMLHttpRequest.prototype.xdrSetRequestHeader = (e, t) => {}),
            (XMLHttpRequest.prototype.xdrLoaded = function () {
              if (null !== this.onreadystatechange) {
                if (
                  ((this.readyState = 4),
                  (this.status = 200),
                  (this.statusText = 'OK'),
                  (this.responseText = this.xdr.responseText),
                  e.ActiveXObject)
                ) {
                  var t = new ActiveXObject('Microsoft.XMLDOM')
                  ;(t.async = 'false'), t.loadXML(this.responseText), (this.responseXML = t)
                }
                this.onreadystatechange()
              }
            }),
            (XMLHttpRequest.prototype.xdrError = function () {
              null !== this.onreadystatechange &&
                ((this.readyState = 4),
                (this.status = 0),
                (this.statusText = ''),
                (this.responseText = ''),
                this.onreadystatechange())
            }),
            (XMLHttpRequest.prototype.xdrProgress = function () {
              null !== this.onreadystatechange &&
                3 !== this.status &&
                ((this.readyState = 3),
                (this.status = 3),
                (this.statusText = ''),
                this.onreadystatechange())
            }),
            (XMLHttpRequest.prototype.finalXDRRequest = function () {
              var e = this.xdr
              delete e.onload, delete e.onerror, delete e.onprogress
            }),
            (XMLHttpRequest.prototype.sendXDR = function (e) {
              var t = this.xdr
              ;(t.onload = this.xdrLoadedBinded),
                (t.onerror = this.xdr.ontimeout = this.xdrErrorBinded),
                (t.onprogress = this.xdrProgressBinded),
                (this.responseText = null),
                this.xdr.send(e)
            }),
            (XMLHttpRequest.prototype.abortXDR = function () {
              this.finalXDRRequest(), this.xdr.abort()
            }),
            (XMLHttpRequest.prototype.setXDRActive = function () {
              ;(this.send = this.sendXDR),
                (this.abort = this.abortXDR),
                (this.getResponseHeader = this.xdrGetResponseHeader),
                (this.getAllResponseHeaders = this.xdrGetAllResponseHeaders),
                (this.setRequestHeader = this.xdrSetRequestHeader)
            }),
            (XMLHttpRequest.prototype.xhrGetResponseHeader = function (e) {
              return this.xhr.getResponseHeader(e)
            }),
            (XMLHttpRequest.prototype.xhrGetAllResponseHeaders = function () {
              return this.xhr.getAllResponseHeaders()
            }),
            (XMLHttpRequest.prototype.xhrSetRequestHeader = function (e, t) {
              return this.xhr.setRequestHeader(e, t)
            }),
            (XMLHttpRequest.prototype.xhrReadyStateChanged = function () {
              if (null !== this.onreadystatechange && this.readyState !== this.xhr.readyState) {
                var e = this.xhr
                ;(this.readyState = e.readyState),
                  4 === this.readyState &&
                    ((this.status = e.status),
                    (this.statusText = e.statusText),
                    (this.responseText = e.responseText),
                    (this.responseXML = e.responseXML),
                    (this.responseBody = e.responseBody)),
                  this.onreadystatechange()
              }
            }),
            (XMLHttpRequest.prototype.finalXHRRequest = function () {
              delete this.xhr.onreadystatechange
            }),
            (XMLHttpRequest.prototype.abortXHR = function () {
              this.finalXHRRequest(), this.xhr.abort()
            }),
            (XMLHttpRequest.prototype.sendXHR = function (e) {
              ;(this.xhr.onreadystatechange = this.xhrReadyStateChangedBinded), this.xhr.send(e)
            }),
            (XMLHttpRequest.prototype.setXHRActive = function () {
              ;(this.send = this.sendXHR),
                (this.abort = this.abortXHR),
                (this.getResponseHeader = this.xhrGetResponseHeader),
                (this.getAllResponseHeaders = this.xhrGetAllResponseHeaders),
                (this.setRequestHeader = this.xhrSetRequestHeader)
            }),
            (e.ieXDRToXHR = void 0)
        }),
        window.ieXDRToXHR(window))
    var hexcase = 0,
      b64pad = '='
    function hex_sha1(e) {
      return rstr2hex(rstr_sha1(str2rstr_utf8(e)))
    }
    function rstr_sha1(e) {
      return binb2rstr(binb_sha1(rstr2binb(e), 8 * e.length))
    }
    function rstr_hmac_sha1(e, t) {
      var n = rstr2binb(e)
      n.length > 16 && (n = binb_sha1(n, 8 * e.length))
      for (var i = Array(16), r = Array(16), s = 0; s < 16; s++)
        (i[s] = 909522486 ^ n[s]), (r[s] = 1549556828 ^ n[s])
      var o = binb_sha1(i.concat(rstr2binb(t)), 512 + 8 * t.length)
      return binb2rstr(binb_sha1(r.concat(o), 672))
    }
    function rstr2binb(e) {
      for (var t = Array(e.length >> 2), n = 0; n < t.length; n++) t[n] = 0
      for (n = 0; n < 8 * e.length; n += 8)
        t[n >> 5] |= (255 & e.charCodeAt(n / 8)) << (24 - (n % 32))
      return t
    }
    function binb2rstr(e) {
      for (var t = '', n = 0; n < 32 * e.length; n += 8)
        t += String.fromCharCode((e[n >> 5] >>> (24 - (n % 32))) & 255)
      return t
    }
    function binb_sha1(e, t) {
      ;(e[t >> 5] |= 128 << (24 - (t % 32))), (e[15 + (((t + 64) >> 9) << 4)] = t)
      for (
        var n = Array(80),
          i = 1732584193,
          r = -271733879,
          s = -1732584194,
          o = 271733878,
          a = -1009589776,
          h = 0;
        h < e.length;
        h += 16
      ) {
        for (var u = i, c = r, l = s, p = o, d = a, _ = 0; _ < 80; _++) {
          n[_] = _ < 16 ? e[h + _] : bit_rol(n[_ - 3] ^ n[_ - 8] ^ n[_ - 14] ^ n[_ - 16], 1)
          var g = safe_add(
            safe_add(bit_rol(i, 5), sha1_ft(_, r, s, o)),
            safe_add(safe_add(a, n[_]), sha1_kt(_))
          )
          ;(a = o), (o = s), (s = bit_rol(r, 30)), (r = i), (i = g)
        }
        ;(i = safe_add(i, u)),
          (r = safe_add(r, c)),
          (s = safe_add(s, l)),
          (o = safe_add(o, p)),
          (a = safe_add(a, d))
      }
      return [i, r, s, o, a]
    }
    function sha1_ft(e, t, n, i) {
      return e < 20
        ? (t & n) | (~t & i)
        : e < 40
          ? t ^ n ^ i
          : e < 60
            ? (t & n) | (t & i) | (n & i)
            : t ^ n ^ i
    }
    function sha1_kt(e) {
      return e < 20 ? 1518500249 : e < 40 ? 1859775393 : e < 60 ? -1894007588 : -899497514
    }
    function hex_md5(e) {
      return rstr2hex(rstr_md5(str2rstr_utf8(e)))
    }
    function rstr_md5(e) {
      return binl2rstr(binl_md5(rstr2binl(e), 8 * e.length))
    }
    function rstr2hex(e) {
      for (
        var t, n = hexcase ? '0123456789ABCDEF' : '0123456789abcdef', i = '', r = 0;
        r < e.length;
        r++
      )
        (t = e.charCodeAt(r)), (i += n.charAt((t >>> 4) & 15) + n.charAt(15 & t))
      return i
    }
    function rstr2b64(e) {
      for (var t = '', n = e.length, i = 0; i < n; i += 3)
        for (
          var r =
              (e.charCodeAt(i) << 16) |
              (i + 1 < n ? e.charCodeAt(i + 1) << 8 : 0) |
              (i + 2 < n ? e.charCodeAt(i + 2) : 0),
            s = 0;
          s < 4;
          s++
        )
          8 * i + 6 * s > 8 * e.length
            ? (t += b64pad)
            : (t += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt(
                (r >>> (6 * (3 - s))) & 63
              ))
      return t
    }
    function str2rstr_utf8(e) {
      for (var t, n, i = '', r = -1; ++r < e.length; )
        (t = e.charCodeAt(r)),
          (n = r + 1 < e.length ? e.charCodeAt(r + 1) : 0),
          55296 <= t &&
            t <= 56319 &&
            56320 <= n &&
            n <= 57343 &&
            ((t = 65536 + ((1023 & t) << 10) + (1023 & n)), r++),
          t <= 127
            ? (i += String.fromCharCode(t))
            : t <= 2047
              ? (i += String.fromCharCode(192 | ((t >>> 6) & 31), 128 | (63 & t)))
              : t <= 65535
                ? (i += String.fromCharCode(
                    224 | ((t >>> 12) & 15),
                    128 | ((t >>> 6) & 63),
                    128 | (63 & t)
                  ))
                : t <= 2097151 &&
                  (i += String.fromCharCode(
                    240 | ((t >>> 18) & 7),
                    128 | ((t >>> 12) & 63),
                    128 | ((t >>> 6) & 63),
                    128 | (63 & t)
                  ))
      return i
    }
    function rstr2binl(e) {
      for (var t = Array(e.length >> 2), n = 0; n < t.length; n++) t[n] = 0
      for (n = 0; n < 8 * e.length; n += 8) t[n >> 5] |= (255 & e.charCodeAt(n / 8)) << (n % 32)
      return t
    }
    function binl2rstr(e) {
      for (var t = '', n = 0; n < 32 * e.length; n += 8)
        t += String.fromCharCode((e[n >> 5] >>> (n % 32)) & 255)
      return t
    }
    function binl_md5(e, t) {
      ;(e[t >> 5] |= 128 << (t % 32)), (e[14 + (((t + 64) >>> 9) << 4)] = t)
      for (
        var n = 1732584193, i = -271733879, r = -1732584194, s = 271733878, o = 0;
        o < e.length;
        o += 16
      ) {
        var a = n,
          h = i,
          u = r,
          c = s
        ;(n = md5_ff(n, i, r, s, e[o + 0], 7, -680876936)),
          (s = md5_ff(s, n, i, r, e[o + 1], 12, -389564586)),
          (r = md5_ff(r, s, n, i, e[o + 2], 17, 606105819)),
          (i = md5_ff(i, r, s, n, e[o + 3], 22, -1044525330)),
          (n = md5_ff(n, i, r, s, e[o + 4], 7, -176418897)),
          (s = md5_ff(s, n, i, r, e[o + 5], 12, 1200080426)),
          (r = md5_ff(r, s, n, i, e[o + 6], 17, -1473231341)),
          (i = md5_ff(i, r, s, n, e[o + 7], 22, -45705983)),
          (n = md5_ff(n, i, r, s, e[o + 8], 7, 1770035416)),
          (s = md5_ff(s, n, i, r, e[o + 9], 12, -1958414417)),
          (r = md5_ff(r, s, n, i, e[o + 10], 17, -42063)),
          (i = md5_ff(i, r, s, n, e[o + 11], 22, -1990404162)),
          (n = md5_ff(n, i, r, s, e[o + 12], 7, 1804603682)),
          (s = md5_ff(s, n, i, r, e[o + 13], 12, -40341101)),
          (r = md5_ff(r, s, n, i, e[o + 14], 17, -1502002290)),
          (n = md5_gg(
            n,
            (i = md5_ff(i, r, s, n, e[o + 15], 22, 1236535329)),
            r,
            s,
            e[o + 1],
            5,
            -165796510
          )),
          (s = md5_gg(s, n, i, r, e[o + 6], 9, -1069501632)),
          (r = md5_gg(r, s, n, i, e[o + 11], 14, 643717713)),
          (i = md5_gg(i, r, s, n, e[o + 0], 20, -373897302)),
          (n = md5_gg(n, i, r, s, e[o + 5], 5, -701558691)),
          (s = md5_gg(s, n, i, r, e[o + 10], 9, 38016083)),
          (r = md5_gg(r, s, n, i, e[o + 15], 14, -660478335)),
          (i = md5_gg(i, r, s, n, e[o + 4], 20, -405537848)),
          (n = md5_gg(n, i, r, s, e[o + 9], 5, 568446438)),
          (s = md5_gg(s, n, i, r, e[o + 14], 9, -1019803690)),
          (r = md5_gg(r, s, n, i, e[o + 3], 14, -187363961)),
          (i = md5_gg(i, r, s, n, e[o + 8], 20, 1163531501)),
          (n = md5_gg(n, i, r, s, e[o + 13], 5, -1444681467)),
          (s = md5_gg(s, n, i, r, e[o + 2], 9, -51403784)),
          (r = md5_gg(r, s, n, i, e[o + 7], 14, 1735328473)),
          (n = md5_hh(
            n,
            (i = md5_gg(i, r, s, n, e[o + 12], 20, -1926607734)),
            r,
            s,
            e[o + 5],
            4,
            -378558
          )),
          (s = md5_hh(s, n, i, r, e[o + 8], 11, -2022574463)),
          (r = md5_hh(r, s, n, i, e[o + 11], 16, 1839030562)),
          (i = md5_hh(i, r, s, n, e[o + 14], 23, -35309556)),
          (n = md5_hh(n, i, r, s, e[o + 1], 4, -1530992060)),
          (s = md5_hh(s, n, i, r, e[o + 4], 11, 1272893353)),
          (r = md5_hh(r, s, n, i, e[o + 7], 16, -155497632)),
          (i = md5_hh(i, r, s, n, e[o + 10], 23, -1094730640)),
          (n = md5_hh(n, i, r, s, e[o + 13], 4, 681279174)),
          (s = md5_hh(s, n, i, r, e[o + 0], 11, -358537222)),
          (r = md5_hh(r, s, n, i, e[o + 3], 16, -722521979)),
          (i = md5_hh(i, r, s, n, e[o + 6], 23, 76029189)),
          (n = md5_hh(n, i, r, s, e[o + 9], 4, -640364487)),
          (s = md5_hh(s, n, i, r, e[o + 12], 11, -421815835)),
          (r = md5_hh(r, s, n, i, e[o + 15], 16, 530742520)),
          (n = md5_ii(
            n,
            (i = md5_hh(i, r, s, n, e[o + 2], 23, -995338651)),
            r,
            s,
            e[o + 0],
            6,
            -198630844
          )),
          (s = md5_ii(s, n, i, r, e[o + 7], 10, 1126891415)),
          (r = md5_ii(r, s, n, i, e[o + 14], 15, -1416354905)),
          (i = md5_ii(i, r, s, n, e[o + 5], 21, -57434055)),
          (n = md5_ii(n, i, r, s, e[o + 12], 6, 1700485571)),
          (s = md5_ii(s, n, i, r, e[o + 3], 10, -1894986606)),
          (r = md5_ii(r, s, n, i, e[o + 10], 15, -1051523)),
          (i = md5_ii(i, r, s, n, e[o + 1], 21, -2054922799)),
          (n = md5_ii(n, i, r, s, e[o + 8], 6, 1873313359)),
          (s = md5_ii(s, n, i, r, e[o + 15], 10, -30611744)),
          (r = md5_ii(r, s, n, i, e[o + 6], 15, -1560198380)),
          (i = md5_ii(i, r, s, n, e[o + 13], 21, 1309151649)),
          (n = md5_ii(n, i, r, s, e[o + 4], 6, -145523070)),
          (s = md5_ii(s, n, i, r, e[o + 11], 10, -1120210379)),
          (r = md5_ii(r, s, n, i, e[o + 2], 15, 718787259)),
          (i = md5_ii(i, r, s, n, e[o + 9], 21, -343485551)),
          (n = safe_add(n, a)),
          (i = safe_add(i, h)),
          (r = safe_add(r, u)),
          (s = safe_add(s, c))
      }
      return [n, i, r, s]
    }
    function md5_cmn(e, t, n, i, r, s) {
      return safe_add(bit_rol(safe_add(safe_add(t, e), safe_add(i, s)), r), n)
    }
    function md5_ff(e, t, n, i, r, s, o) {
      return md5_cmn((t & n) | (~t & i), e, t, r, s, o)
    }
    function md5_gg(e, t, n, i, r, s, o) {
      return md5_cmn((t & i) | (n & ~i), e, t, r, s, o)
    }
    function md5_hh(e, t, n, i, r, s, o) {
      return md5_cmn(t ^ n ^ i, e, t, r, s, o)
    }
    function md5_ii(e, t, n, i, r, s, o) {
      return md5_cmn(n ^ (t | ~i), e, t, r, s, o)
    }
    function safe_add(e, t) {
      var n = (65535 & e) + (65535 & t)
      return (((e >> 16) + (t >> 16) + (n >> 16)) << 16) | (65535 & n)
    }
    function bit_rol(e, t) {
      return (e << t) | (e >>> (32 - t))
    }
    function utf8t2d(e) {
      e = e.replace(/\r\n/g, '\n')
      var t = []
      if (String.fromCharCode(237).charCodeAt(0) < 0)
        for (var n = 0; n < e.length; n++) {
          ;(i = e.charCodeAt(n)) > 0
            ? (t[t.length] = i)
            : ((t[t.length] = ((256 + i) >> 6) | 192), (t[t.length] = ((256 + i) & 63) | 128))
        }
      else
        for (n = 0; n < e.length; n++) {
          var i
          ;(i = e.charCodeAt(n)) < 128
            ? (t[t.length] = i)
            : i > 127 && i < 2048
              ? ((t[t.length] = (i >> 6) | 192), (t[t.length] = (63 & i) | 128))
              : ((t[t.length] = (i >> 12) | 224),
                (t[t.length] = ((i >> 6) & 63) | 128),
                (t[t.length] = (63 & i) | 128))
        }
      return t
    }
    function utf8d2t(e) {
      for (var t = [], n = 0; n < e.length; )
        e[n] < 128
          ? ((t[t.length] = String.fromCharCode(e[n])), n++)
          : e[n] > 191 && e[n] < 224
            ? ((t[t.length] = String.fromCharCode(((31 & e[n]) << 6) | (63 & e[n + 1]))), (n += 2))
            : ((t[t.length] = String.fromCharCode(
                ((15 & e[n]) << 12) | ((63 & e[n + 1]) << 6) | (63 & e[n + 2])
              )),
              (n += 3))
      return t.join('')
    }
    function b64arrays() {
      var e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
      ;(b64 = []), (f64 = [])
      for (var t = 0; t < 64; t++) (b64[t] = e.charAt(t)), (f64[e.charAt(t)] = t)
    }
    function b64d2t(e) {
      var t = [],
        n = 0,
        i = e.length
      for (
        i % 3 == 1 && ((e[e.length] = 0), (e[e.length] = 0)), i % 3 == 2 && (e[e.length] = 0);
        n < e.length;
      )
        (t[t.length] = b64[e[n] >> 2]),
          (t[t.length] = b64[((3 & e[n]) << 4) | (e[n + 1] >> 4)]),
          (t[t.length] = b64[((15 & e[n + 1]) << 2) | (e[n + 2] >> 6)]),
          (t[t.length] = b64[63 & e[n + 2]]),
          (n += 3)
      return (
        i % 3 == 1 && (t[t.length - 1] = t[t.length - 2] = '='),
        i % 3 == 2 && (t[t.length - 1] = '='),
        t.join('')
      )
    }
    function b64t2d(e) {
      var t = [],
        n = 0
      for (e = (e = e.replace(/\n|\r/g, '')).replace(/=/g, ''); n < e.length; )
        (t[t.length] = (f64[e.charAt(n)] << 2) | (f64[e.charAt(n + 1)] >> 4)),
          (t[t.length] = ((15 & f64[e.charAt(n + 1)]) << 4) | (f64[e.charAt(n + 2)] >> 2)),
          (t[t.length] = ((3 & f64[e.charAt(n + 2)]) << 6) | f64[e.charAt(n + 3)]),
          (n += 4)
      return (
        e.length % 4 == 2 && (t = t.slice(0, t.length - 2)),
        e.length % 4 == 3 && (t = t.slice(0, t.length - 1)),
        t
      )
    }
    if (
      (('undefined' != typeof atob && 'undefined' != typeof btoa) || b64arrays(),
      'undefined' == typeof atob)
    )
      var b64decode = e => utf8d2t(b64t2d(e)),
        b64decode_bin = e => {
          for (var t = b64t2d(e), n = '', i = 0; i < t.length; i++) n += String.fromCharCode(t[i])
          return n
        }
    else
      var b64decode = e => decodeURIComponent(escape(atob(e))),
        b64decode_bin = atob
    if ('undefined' == typeof btoa) var b64encode = e => b64d2t(utf8t2d(e))
    else var b64encode = e => btoa(unescape(encodeURIComponent(e)))
    function JSJaCJSON() {}
    function XmlHttp() {}
    function XmlDocument() {}
    ;(JSJaCJSON.toString = e => {
      var t = {
          '\b': '\\b',
          '\t': '\\t',
          '\n': '\\n',
          '\f': '\\f',
          '\r': '\\r',
          '"': '\\"',
          '\\': '\\\\',
        },
        n = {
          array: e => {
            var t,
              i,
              r,
              s,
              o = ['['],
              a = e.length
            for (r = 0; r < a; r += 1)
              if (((s = e[r]), (i = n[typeof s])))
                try {
                  'string' == typeof (s = i(s)) &&
                    (t && (o[o.length] = ','), (o[o.length] = s), (t = !0))
                } catch (e) {}
            return (o[o.length] = ']'), o.join('')
          },
          boolean: e => String(e),
          null: () => 'null',
          number: e => (isFinite(e) ? String(e) : 'null'),
          object: e => {
            if (e) {
              if (e instanceof Array) return n.array(e)
              var t,
                i,
                r,
                s,
                o = []
              for (r in (o.push('{'), e))
                if (Object.hasOwn(e, r) && ((s = e[r]), (i = n[typeof s])))
                  try {
                    'string' == typeof (s = i(s)) &&
                      (t && (o[o.length] = ','), o.push(n.string(r), ':', s), (t = !0))
                  } catch (e) {}
              return (o[o.length] = '}'), o.join('')
            }
            return 'null'
          },
          string: e => (
            /["\\\x00-\x1f]/.test(e) &&
              (e = e.replace(/([\x00-\x1f\\"])/g, (e, n) => {
                var i = t[n]
                return (
                  i ||
                  ((i = n.charCodeAt()),
                  '\\u00' + Math.floor(i / 16).toString(16) + (i % 16).toString(16))
                )
              })),
            '"' + e + '"'
          ),
        }
      switch (typeof e) {
        case 'object':
          return n.object(e)
        case 'array':
          return n.array(e)
      }
    }),
      (JSJaCJSON.parse = str => {
        try {
          return (
            !/[^,:{}[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(str.replace(/"(\\.|[^"\\])*"/g, '')) &&
            eval('(' + str + ')')
          )
        } catch (e) {
          return !1
        }
      }),
      (XmlHttp.create = () => {
        try {
          if (window.XMLHttpRequest) {
            var e = new XMLHttpRequest()
            return (
              null === e.readyState &&
                ((e.readyState = 1),
                e.addEventListener(
                  'load',
                  () => {
                    ;(e.readyState = 4),
                      'function' == typeof e.onreadystatechange && e.onreadystatechange()
                  },
                  !1
                )),
              e
            )
          }
          if (window.ActiveXObject) return new ActiveXObject(XmlHttp.getPrefix() + '.XmlHttp')
        } catch (e) {}
        throw new Error('Your browser does not support XmlHttp objects')
      }),
      (XmlHttp.getPrefix = () => {
        if (XmlHttp.prefix) return XmlHttp.prefix
        for (var e = ['MSXML2', 'Microsoft', 'MSXML', 'MSXML3'], t = 0; t < e.length; t++)
          try {
            return new ActiveXObject(e[t] + '.XmlHttp'), (XmlHttp.prefix = e[t])
          } catch (e) {}
        throw new Error('Could not find an installed XML parser')
      }),
      (XmlDocument.create = (e, t) => {
        ;(e = e || 'foo'), (t = t || '')
        try {
          var n
          if (
            (document.implementation && document.implementation.createDocument
              ? null === (n = document.implementation.createDocument(t, e, null)).readyState &&
                ((n.readyState = 1),
                n.addEventListener(
                  'load',
                  () => {
                    ;(n.readyState = 4),
                      'function' == typeof n.onreadystatechange && n.onreadystatechange()
                  },
                  !1
                ))
              : window.ActiveXObject &&
                (n = new ActiveXObject(XmlDocument.getPrefix() + '.DomDocument')),
            !n.documentElement ||
              n.documentElement.tagName != e ||
              (n.documentElement.namespaceURI && n.documentElement.namespaceURI != t))
          )
            try {
              '' !== t
                ? n.appendChild(n.createElement(e)).setAttribute('xmlns', t)
                : n.appendChild(n.createElement(e))
            } catch (i) {
              null === (n = document.implementation.createDocument(t, e, null)).documentElement &&
                n.appendChild(n.createElement(e)),
                '' !== t &&
                  n.documentElement.getAttribute('xmlns') != t &&
                  n.documentElement.setAttribute('xmlns', t)
            }
          return n
        } catch (e) {}
        throw new Error('Your browser does not support XmlDocument objects')
      }),
      (XmlDocument.getPrefix = () => {
        if (XmlDocument.prefix) return XmlDocument.prefix
        for (var e = ['MSXML2', 'Microsoft', 'MSXML', 'MSXML3'], t = 0; t < e.length; t++)
          try {
            return new ActiveXObject(e[t] + '.DomDocument'), (XmlDocument.prefix = e[t])
          } catch (e) {}
        throw new Error('Could not find an installed XML parser')
      }),
      'undefined' != typeof Document &&
        window.DOMParser &&
        (Document.prototype.loadXML = function (e) {
          for (var t = new DOMParser().parseFromString(e, 'text/xml'); this.hasChildNodes(); )
            this.removeChild(this.lastChild)
          for (var n = 0; n < t.childNodes.length; n++)
            this.appendChild(this.importNode(t.childNodes[n], !0))
        }),
      'undefined' != typeof window &&
        window.XMLSerializer &&
        window.Node &&
        Node.prototype &&
        Node.prototype.__defineGetter__ &&
        (XMLDocument.prototype.__defineGetter__('xml', function () {
          return new XMLSerializer().serializeToString(this)
        }),
        Document.prototype.__defineGetter__('xml', function () {
          return new XMLSerializer().serializeToString(this)
        }),
        Node.prototype.__defineGetter__('xml', function () {
          return new XMLSerializer().serializeToString(this)
        }))
    var JSJaCUtils = {
        xor: (e, t) => {
          if (!e) return t
          if (!t) return e
          for (var n = '', i = 0; i < e.length; i++)
            n += String.fromCharCode(e.charCodeAt(i) ^ t.charCodeAt(i))
          return n
        },
        cnonce: e => {
          for (
            var t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', n = '', i = 0;
            i < e;
            i++
          )
            n += t.charAt(Math.round(61 * Math.random(new Date().getTime())))
          return n
        },
        now: () => (Date.now && 'function' == typeof Date.now ? Date.now() : new Date().getTime()),
      },
      JSJaCBuilder = {
        buildNode: function (e, t) {
          var n,
            i = arguments[4]
          if (arguments[2])
            if (JSJaCBuilder._isStringOrNumber(arguments[2]) || arguments[2] instanceof Array)
              (n = this._createElement(e, t, i)), JSJaCBuilder._children(e, n, arguments[2])
            else
              for (var r in ((i = arguments[2].xmlns || i),
              (n = this._createElement(e, t, i)),
              arguments[2]))
                Object.hasOwn(arguments[2], r) && 'xmlns' != r && n.setAttribute(r, arguments[2][r])
          else n = this._createElement(e, t, i)
          return arguments[3] && JSJaCBuilder._children(e, n, arguments[3], i), n
        },
        _createElement: (e, t, n) => {
          try {
            if (n) return e.createElementNS(n, t)
          } catch (e) {}
          var i = e.createElement(t)
          return n && i.setAttribute('xmlns', n), i
        },
        _text: (e, t) => e.createTextNode(t),
        _children: (e, t, n, i) => {
          if ('object' == typeof n) {
            for (var r in n)
              if (Object.hasOwn(n, r)) {
                var s = n[r]
                if ('object' == typeof s)
                  if (s instanceof Array) {
                    var o = JSJaCBuilder.buildNode(e, s[0], s[1], s[2], i)
                    t.appendChild(o)
                  } else t.appendChild(s)
                else JSJaCBuilder._isStringOrNumber(s) && t.appendChild(JSJaCBuilder._text(e, s))
              }
          } else JSJaCBuilder._isStringOrNumber(n) && t.appendChild(JSJaCBuilder._text(e, n))
        },
        _attributes: e => {
          var t = []
          for (var n in e) Object.hasOwn(e, n) && t.push(n + '="' + e[n].toString().htmlEnc() + '"')
          return t.join(' ')
        },
        _isStringOrNumber: e => 'string' == typeof e || 'number' == typeof e,
      },
      NS_AUTH = 'jabber:iq:auth',
      NS_REGISTER = 'jabber:iq:register',
      NS_STREAM = 'http://etherx.jabber.org/streams',
      NS_FRAMING = 'urn:ietf:params:xml:ns:xmpp-framing',
      NS_CLIENT = 'jabber:client',
      NS_BOSH = 'http://jabber.org/protocol/httpbind',
      NS_STANZAS = 'urn:ietf:params:xml:ns:xmpp-stanzas',
      NS_STREAMS = 'urn:ietf:params:xml:ns:xmpp-streams',
      NS_SASL = 'urn:ietf:params:xml:ns:xmpp-sasl',
      NS_SESSION = 'urn:ietf:params:xml:ns:xmpp-session',
      NS_BIND = 'urn:ietf:params:xml:ns:xmpp-bind'
    function STANZA_ERROR(e, t, n) {
      if ('undefined' != typeof window && window == this) return new STANZA_ERROR(e, t, n)
      ;(this.code = e), (this.type = t), (this.cond = n)
    }
    function JSJaCCookieException(e) {
      ;(this.message = e), (this.name = 'CookieException')
    }
    function JSJaCCookie(e, t, n, i, r) {
      if ('undefined' != typeof window && window == this) return new JSJaCCookie(e, t, n, i, r)
      ;(this.name = e),
        (this.value = t),
        (this.secs = n),
        (this.domain = i),
        (this.path = r),
        (this.write = function () {
          var e
          if (this.secs) {
            var t = new Date()
            t.setTime(t.getTime() + 1e3 * this.secs), (e = '; expires=' + t.toGMTString())
          } else e = ''
          var n = this.domain ? '; domain=' + this.domain : '',
            i = this.path ? '; path=' + this.path : '; path=/'
          document.cookie = this.getName() + '=' + JSJaCCookie._escape(this.getValue()) + e + n + i
        }),
        (this.erase = function () {
          new JSJaCCookie(this.getName(), '', -1).write()
        }),
        (this.getName = function () {
          return this.name
        }),
        (this.setName = function (e) {
          return (this.name = e), this
        }),
        (this.getValue = function () {
          return this.value
        }),
        (this.setValue = function (e) {
          return (this.value = e), this
        }),
        (this.setDomain = function (e) {
          return (this.domain = e), this
        }),
        (this.setPath = function (e) {
          return (this.path = e), this
        })
    }
    function JSJaCError(e, t, n) {
      var i = XmlDocument.create('error', 'jsjac')
      return (
        i.documentElement.setAttribute('code', e),
        i.documentElement.setAttribute('type', t),
        n && i.documentElement.appendChild(i.createElement(n)).setAttribute('xmlns', NS_STANZAS),
        i.documentElement
      )
    }
    function JSJaCJIDInvalidException(e) {
      ;(this.message = e), (this.name = 'JSJaCJIDInvalidException')
    }
    new STANZA_ERROR('400', 'modify', 'bad-request'),
      new STANZA_ERROR('409', 'cancel', 'conflict'),
      new STANZA_ERROR('501', 'cancel', 'feature-not-implemented'),
      new STANZA_ERROR('403', 'auth', 'forbidden'),
      new STANZA_ERROR('302', 'modify', 'gone'),
      new STANZA_ERROR('500', 'wait', 'internal-server-error'),
      new STANZA_ERROR('404', 'cancel', 'item-not-found'),
      new STANZA_ERROR('400', 'modify', 'jid-malformed'),
      new STANZA_ERROR('406', 'modify', 'not-acceptable'),
      new STANZA_ERROR('405', 'cancel', 'not-allowed'),
      new STANZA_ERROR('401', 'auth', 'not-authorized'),
      new STANZA_ERROR('402', 'auth', 'payment-required'),
      new STANZA_ERROR('404', 'wait', 'recipient-unavailable'),
      new STANZA_ERROR('302', 'modify', 'redirect'),
      new STANZA_ERROR('407', 'auth', 'registration-required'),
      new STANZA_ERROR('404', 'cancel', 'remote-server-not-found'),
      new STANZA_ERROR('504', 'wait', 'remote-server-timeout'),
      new STANZA_ERROR('500', 'wait', 'resource-constraint'),
      new STANZA_ERROR('503', 'cancel', 'service-unavailable'),
      new STANZA_ERROR('407', 'auth', 'subscription-required'),
      new STANZA_ERROR('400', 'wait', 'unexpected-request'),
      (JSJaCCookie.read = e => {
        for (var t = e + '=', n = document.cookie.split(';'), i = 0; i < n.length; i++) {
          for (var r = n[i]; ' ' == r.charAt(0); ) r = r.substring(1, r.length)
          if (0 === r.indexOf(t))
            return new JSJaCCookie(e, JSJaCCookie._unescape(r.substring(t.length, r.length)))
        }
        throw new JSJaCCookieException('Cookie not found')
      }),
      (JSJaCCookie.get = e => JSJaCCookie.read(e).getValue()),
      (JSJaCCookie.remove = e => {
        JSJaCCookie.read(e).erase()
      }),
      (JSJaCCookie._escape = e => e.replace(/;/g, '%3AB')),
      (JSJaCCookie._unescape = e => e.replace(/%3AB/g, ';'))
    var JSJACJID_FORBIDDEN = ['"', ' ', '&', "'", '/', ':', '<', '>', '@']
    function JSJaCJID(e) {
      ;(this._node = ''),
        (this._domain = ''),
        (this._resource = ''),
        'string' == typeof e
          ? (-1 != e.indexOf('@') &&
              (this.setNode(e.substring(0, e.indexOf('@'))), (e = e.substring(e.indexOf('@') + 1))),
            -1 != e.indexOf('/') &&
              (this.setResource(e.substring(e.indexOf('/') + 1)),
              (e = e.substring(0, e.indexOf('/')))),
            this.setDomain(e))
          : (this.setNode(e.node), this.setDomain(e.domain), this.setResource(e.resource))
    }
    function JSJaCKeys(e, t) {
      var n = Math.random()
      if (
        ((this._k = []),
        (this._k[0] = n.toString()),
        t ? (this.oDbg = t) : ((this.oDbg = {}), (this.oDbg.log = () => {})),
        e)
      )
        for (var i = 1; i < JSJAC_NKEYS; i++)
          (this._k[i] = e(this._k[i - 1])), t.log(i + ': ' + this._k[i], 4)
      ;(this._indexAt = JSJAC_NKEYS - 1),
        (this.getKey = function () {
          return this._k[this._indexAt--]
        }),
        (this.lastKey = function () {
          return 0 === this._indexAt
        }),
        (this.size = function () {
          return this._k.length
        }),
        (this._getSuspendVars = () => '_k,_indexAt'.split(','))
    }
    function JSJaCPacket(e) {
      ;(this.name = e), (this.doc = XmlDocument.create(e, NS_CLIENT))
    }
    function JSJaCPresence() {
      ;(this.base = JSJaCPacket), this.base('presence')
    }
    function JSJaCIQ() {
      ;(this.base = JSJaCPacket), this.base('iq')
    }
    function JSJaCMessage() {
      ;(this.base = JSJaCPacket), this.base('message')
    }
    function JSJaCConnection(e) {
      e && e.httpbase && (this._httpbase = e.httpbase),
        e && e.oDbg && e.oDbg.log
          ? (this.oDbg = e.oDbg)
          : (this.oDbg = {
              log: () => {},
            }),
        e && e.timerval ? this.setPollInterval(e.timerval) : this.setPollInterval(JSJAC_TIMERVAL),
        e && e.cookie_prefix ? (this._cookie_prefix = e.cookie_prefix) : (this._cookie_prefix = ''),
        (this._connected = !1),
        (this._events = []),
        (this._keys = null),
        (this._ID = 0),
        (this._inQ = []),
        (this._pQueue = []),
        (this._regIDs = []),
        (this._req = []),
        (this._status = 'intialized'),
        (this._errcnt = 0),
        (this._inactivity = JSJAC_INACTIVITY),
        (this._sendRawCallbacks = [])
    }
    function JSJaCHttpBindingConnection(e) {
      ;(this.base = JSJaCConnection),
        this.base(e),
        (this._hold = JSJACHBC_MAX_HOLD),
        (this._inactivity = 0),
        (this._last_requests = {}),
        (this._last_rid = 0),
        (this._min_polling = 0),
        (this._pause = 0),
        (this._wait = e.wait || JSJACHBC_MAX_WAIT)
    }
    function JSJaCWebSocketConnection(e) {
      ;(this.base = JSJaCConnection),
        this.base(e),
        (this._ws = null),
        this.registerHandler('onerror', JSJaC.bind(this._cleanupWebSocket, this))
    }
    ;(JSJaCJID.prototype.getBareJID = function () {
      return this.getNode() + '@' + this.getDomain()
    }),
      (JSJaCJID.prototype.getNode = function () {
        return this._node
      }),
      (JSJaCJID.prototype.getDomain = function () {
        return this._domain
      }),
      (JSJaCJID.prototype.getResource = function () {
        return this._resource
      }),
      (JSJaCJID.prototype.setNode = function (e) {
        return JSJaCJID._checkNodeName(e), (this._node = e || ''), this
      }),
      (JSJaCJID.prototype.setDomain = function (e) {
        if (!e || '' === e) throw new JSJaCJIDInvalidException('domain name missing')
        return JSJaCJID._checkNodeName(e), (this._domain = e), this
      }),
      (JSJaCJID.prototype.setResource = function (e) {
        return (this._resource = e || ''), this
      }),
      (JSJaCJID.prototype.toString = function () {
        var e = ''
        return (
          this.getNode() && '' !== this.getNode() && (e = this.getNode() + '@'),
          (e += this.getDomain()),
          this.getResource() && '' !== this.getResource() && (e += '/' + this.getResource()),
          e
        )
      }),
      (JSJaCJID.prototype.removeResource = function () {
        return this.setResource()
      }),
      (JSJaCJID.prototype.clone = function () {
        return new JSJaCJID(this.toString())
      }),
      (JSJaCJID.prototype.isEntity = function (e) {
        return (
          (e = 'string' == typeof e ? new JSJaCJID(e) : e.clone()).removeResource(),
          this.clone().removeResource().toString() === e.toString()
        )
      }),
      (JSJaCJID._checkNodeName = e => {
        if (e && '' !== e)
          for (var t = 0; t < JSJACJID_FORBIDDEN.length; t++)
            if (-1 != e.indexOf(JSJACJID_FORBIDDEN[t]))
              throw new JSJaCJIDInvalidException(
                'forbidden char in nodename: ' + JSJACJID_FORBIDDEN[t]
              )
      }),
      (JSJaCPacket.prototype.pType = function () {
        return this.name
      }),
      (JSJaCPacket.prototype.getDoc = function () {
        return this.doc
      }),
      (JSJaCPacket.prototype.getNode = function () {
        return this.getDoc() && this.getDoc().documentElement ? this.getDoc().documentElement : null
      }),
      (JSJaCPacket.prototype.setTo = function (e) {
        return (
          e
            ? 'string' == typeof e
              ? this.getNode().setAttribute('to', e)
              : this.getNode().setAttribute('to', e.toString())
            : this.getNode().removeAttribute('to'),
          this
        )
      }),
      (JSJaCPacket.prototype.setFrom = function (e) {
        return (
          e
            ? 'string' == typeof e
              ? this.getNode().setAttribute('from', e)
              : this.getNode().setAttribute('from', e.toString())
            : this.getNode().removeAttribute('from'),
          this
        )
      }),
      (JSJaCPacket.prototype.setID = function (e) {
        return e ? this.getNode().setAttribute('id', e) : this.getNode().removeAttribute('id'), this
      }),
      (JSJaCPacket.prototype.setType = function (e) {
        return (
          e ? this.getNode().setAttribute('type', e) : this.getNode().removeAttribute('type'), this
        )
      }),
      (JSJaCPacket.prototype.setXMLLang = function (e) {
        return (
          e ? this.getNode().setAttribute('xml:lang', e) : this.getNode().removeAttribute('xml:lang'),
          this
        )
      }),
      (JSJaCPacket.prototype.getTo = function () {
        return this.getNode().getAttribute('to')
      }),
      (JSJaCPacket.prototype.getFrom = function () {
        return this.getNode().getAttribute('from')
      }),
      (JSJaCPacket.prototype.getToJID = function () {
        return new JSJaCJID(this.getTo())
      }),
      (JSJaCPacket.prototype.getFromJID = function () {
        return new JSJaCJID(this.getFrom())
      }),
      (JSJaCPacket.prototype.getID = function () {
        return this.getNode().getAttribute('id')
      }),
      (JSJaCPacket.prototype.getType = function () {
        return this.getNode().getAttribute('type')
      }),
      (JSJaCPacket.prototype.getXMLLang = function () {
        return this.getNode().getAttribute('xml:lang')
      }),
      (JSJaCPacket.prototype.getXMLNS = function () {
        return this.getNode().namespaceURI || this.getNode().getAttribute('xmlns')
      }),
      (JSJaCPacket.prototype.getChild = function (e, t) {
        if (!this.getNode()) return null
        if (((e = e || '*'), (t = t || '*'), this.getNode().getElementsByTagNameNS))
          return this.getNode().getElementsByTagNameNS(t, e).item(0)
        var n = this.getNode().getElementsByTagName(e)
        if ('*' == t) return n.item(0)
        for (var i = 0; i < n.length; i++)
          if (n.item(i).namespaceURI == t || n.item(i).getAttribute('xmlns') == t) return n.item(i)
        return null
      }),
      (JSJaCPacket.prototype.getChildVal = function (e, t) {
        var n = this.getChild(e, t),
          i = ''
        if (n && n.hasChildNodes())
          for (var r = 0; r < n.childNodes.length; r++)
            n.childNodes.item(r).nodeValue && (i += n.childNodes.item(r).nodeValue)
        return i
      }),
      (JSJaCPacket.prototype.clone = function () {
        return JSJaCPacket.wrapNode(this.getNode())
      }),
      (JSJaCPacket.prototype.isError = function () {
        return 'error' == this.getType()
      }),
      (JSJaCPacket.prototype.errorReply = function (e) {
        var t = this.clone()
        return (
          t.setTo(this.getFrom()),
          t.setFrom(),
          t.setType('error'),
          t.appendNode(
            'error',
            {
              code: e.code,
              type: e.type,
            },
            [
              [
                e.cond,
                {
                  xmlns: NS_STANZAS,
                },
              ],
            ]
          ),
          t
        )
      }),
      (JSJaCPacket.prototype.xml =
        'undefined' != typeof XMLSerializer
          ? function () {
              var e = new XMLSerializer().serializeToString(this.getNode())
              return void 0 === e && (e = new XMLSerializer().serializeToString(this.doc)), e
            }
          : function () {
              return this.getDoc().xml
            }),
      (JSJaCPacket.prototype._getAttribute = function (e) {
        return this.getNode().getAttribute(e)
      }),
      document.ELEMENT_NODE ||
        ((document.ELEMENT_NODE = 1),
        (document.ATTRIBUTE_NODE = 2),
        (document.TEXT_NODE = 3),
        (document.CDATA_SECTION_NODE = 4),
        (document.ENTITY_REFERENCE_NODE = 5),
        (document.ENTITY_NODE = 6),
        (document.PROCESSING_INSTRUCTION_NODE = 7),
        (document.COMMENT_NODE = 8),
        (document.DOCUMENT_NODE = 9),
        (document.DOCUMENT_TYPE_NODE = 10),
        (document.DOCUMENT_FRAGMENT_NODE = 11),
        (document.NOTATION_NODE = 12)),
      (JSJaCPacket.prototype._importNode = function (e, t) {
        switch (e.nodeType) {
          case document.ELEMENT_NODE: {
            var n, i, r
            if (
              ((n = this.getDoc().createElementNS
                ? this.getDoc().createElementNS(e.namespaceURI, e.nodeName)
                : this.getDoc().createElement(e.nodeName)),
              e.attributes && e.attributes.length > 0)
            )
              for (i = 0, r = e.attributes.length; i < r; i++) {
                var s = e.attributes.item(i)
                ;('xmlns' != s.nodeName || (null === n.getAttribute('xmlns') && !n.namespaceURI)) &&
                  (n.setAttributeNS && s.namespaceURI
                    ? n.setAttributeNS(s.namespaceURI, s.name, s.value)
                    : n.setAttribute(s.name, s.value))
              }
            if (t && e.childNodes && e.childNodes.length > 0)
              for (i = 0, r = e.childNodes.length; i < r; i++)
                n.appendChild(this._importNode(e.childNodes.item(i), t))
            return n
          }
          case document.TEXT_NODE:
          case document.CDATA_SECTION_NODE:
          case document.COMMENT_NODE:
            return this.getDoc().createTextNode(e.nodeValue)
        }
      }),
      (JSJaCPacket.prototype._setChildNode = function (e, t) {
        var n = this.getChild(e),
          i = this.getDoc().createTextNode(t)
        if (n)
          try {
            n.replaceChild(i, n.firstChild)
          } catch (e) {}
        else {
          try {
            n = this.getDoc().createElementNS(this.getNode().namespaceURI, e)
          } catch (t) {
            n = this.getDoc().createElement(e)
          }
          this.getNode().appendChild(n), n.appendChild(i)
        }
        return n
      }),
      (JSJaCPacket.prototype.buildNode = function (e) {
        return JSJaCBuilder.buildNode(this.getDoc(), e, arguments[1], arguments[2], arguments[3])
      }),
      (JSJaCPacket.prototype.appendNode = function (e) {
        return 'object' == typeof e
          ? this.getNode().appendChild(e)
          : this.getNode().appendChild(
              this.buildNode(e, arguments[1], arguments[2], this.getNode().namespaceURI)
            )
      }),
      (JSJaCPresence.prototype = new JSJaCPacket()),
      (JSJaCPresence.prototype.setStatus = function (e) {
        return this._setChildNode('status', e), this
      }),
      (JSJaCPresence.prototype.setShow = function (e) {
        return (
          ('chat' != e && 'away' != e && 'xa' != e && 'dnd' != e) || this._setChildNode('show', e),
          this
        )
      }),
      (JSJaCPresence.prototype.setPriority = function (e) {
        return this._setChildNode('priority', e), this
      }),
      (JSJaCPresence.prototype.setPresence = function (e, t, n) {
        return e && this.setShow(e), t && this.setStatus(t), n && this.setPriority(n), this
      }),
      (JSJaCPresence.prototype.getStatus = function () {
        return this.getChildVal('status')
      }),
      (JSJaCPresence.prototype.getShow = function () {
        return this.getChildVal('show')
      }),
      (JSJaCPresence.prototype.getPriority = function () {
        return this.getChildVal('priority')
      }),
      (JSJaCIQ.prototype = new JSJaCPacket()),
      (JSJaCIQ.prototype.setIQ = function (e, t, n) {
        return e && this.setTo(e), t && this.setType(t), n && this.setID(n), this
      }),
      (JSJaCIQ.prototype.setQuery = function (e) {
        var t
        try {
          t = this.getDoc().createElementNS(e, 'query')
        } catch (n) {
          ;(t = this.getDoc().createElement('query')).setAttribute('xmlns', e)
        }
        return this.getNode().appendChild(t), t
      }),
      (JSJaCIQ.prototype.getQuery = function () {
        return this.getNode().getElementsByTagName('query').item(0)
      }),
      (JSJaCIQ.prototype.getQueryXMLNS = function () {
        return this.getQuery()
          ? this.getQuery().namespaceURI || this.getQuery().getAttribute('xmlns')
          : null
      }),
      (JSJaCIQ.prototype.reply = function (e) {
        var t = this.clone()
        if ((t.setTo(this.getFrom()), t.setFrom(), t.setType('result'), e))
          if ('string' == typeof e) t.getChild().appendChild(t.getDoc().loadXML(e))
          else if (e.constructor == Array)
            for (var n = t.getChild(), i = 0; i < e.length; i++)
              'string' == typeof e[i]
                ? n.appendChild(t.getDoc().loadXML(e[i]))
                : 'object' == typeof e[i] && n.appendChild(e[i])
          else 'object' == typeof e && t.getChild().appendChild(e)
        return t
      }),
      (JSJaCMessage.prototype = new JSJaCPacket()),
      (JSJaCMessage.prototype.setBody = function (e) {
        return this._setChildNode('body', e), this
      }),
      (JSJaCMessage.prototype.setSubject = function (e) {
        return this._setChildNode('subject', e), this
      }),
      (JSJaCMessage.prototype.setThread = function (e) {
        return this._setChildNode('thread', e), this
      }),
      (JSJaCMessage.prototype.getThread = function () {
        return this.getChildVal('thread')
      }),
      (JSJaCMessage.prototype.getBody = function () {
        return this.getChildVal('body')
      }),
      (JSJaCMessage.prototype.getSubject = function () {
        return this.getChildVal('subject')
      }),
      (JSJaCPacket.wrapNode = e => {
        var t = null
        switch (e.nodeName.toLowerCase()) {
          case 'presence':
            t = new JSJaCPresence()
            break
          case 'message':
            t = new JSJaCMessage()
            break
          case 'iq':
            t = new JSJaCIQ()
        }
        return t && t.getDoc().replaceChild(t._importNode(e, !0), t.getNode()), t
      }),
      (JSJaCConnection.prototype.connect = function (e) {
        this._setStatus('connecting'),
          (this.domain = e.domain || 'localhost'),
          (this.username = e.username),
          (this.resource = e.resource),
          (this.pass = e.password || e.pass),
          (this.authzid = e.authzid || ''),
          (this.register = e.register),
          (this.authhost = e.authhost || e.host || e.domain),
          (this.authtype = e.authtype || 'sasl'),
          e.xmllang && '' !== e.xmllang ? (this._xmllang = e.xmllang) : (this._xmllang = 'en'),
          e.allow_plain
            ? (this._allow_plain = e.allow_plain)
            : (this._allow_plain = JSJAC_ALLOW_PLAIN),
          e.allow_scram
            ? (this._allow_scram = e.allow_scram)
            : (this._allow_scram = JSJAC_ALLOW_SCRAM),
          (this.host = e.host),
          (this.port = e.port || 5222),
          (this.jid = this.username + '@' + this.domain),
          (this.fulljid = this.jid + '/' + this.resource),
          (this._rid = Math.round(100000.5 + 799999.99999 * Math.random()))
        var t = this._getFreeSlot()
        this._req[t] = this._setupRequest(!0)
        var n = this._getInitialRequestString()
        this.oDbg.log(n, 4),
          (this._req[t].r.onreadystatechange = JSJaC.bind(function () {
            var e = this._req[t].r
            4 == e.readyState &&
              (this.oDbg.log('async recv: ' + e.responseText, 4), this._handleInitialResponse(e))
          }, this)),
          void 0 !== this._req[t].r.onerror &&
            (this._req[t].r.onerror = JSJaC.bind(function () {
              this.oDbg.log('XmlHttpRequest error', 1)
            }, this)),
          this._req[t].r.send(n)
      }),
      (JSJaCConnection.prototype.connected = function () {
        return this._connected
      }),
      (JSJaCConnection.prototype.disconnect = function () {
        if ((this._setStatus('disconnecting'), this.connected())) {
          ;(this._connected = !1),
            clearInterval(this._interval),
            clearInterval(this._inQto),
            this._timeout && clearTimeout(this._timeout)
          var e = this._getFreeSlot()
          this._req[e] = this._setupRequest(!1)
          var t = this._getRequestString(!1, !0)
          this.oDbg.log('Disconnecting: ' + t, 4)
          try {
            this._req[e].r.send(t)
          } catch (e) {}
          this.oDbg.log('disconnected')
          try {
            JSJaCCookie.read(this._cookie_prefix + 'JSJaC_State').erase()
          } catch (e) {}
          this._handleEvent('ondisconnect')
        }
      }),
      (JSJaCConnection.prototype.getPollInterval = function () {
        return this._timerval
      }),
      (JSJaCConnection.prototype.registerHandler = function (e) {
        e = e.toLowerCase()
        var t = {
          handler: arguments[arguments.length - 1],
          childName: '*',
          childNS: '*',
          type: '*',
        }
        return (
          arguments.length > 2 && (t.childName = arguments[1]),
          arguments.length > 3 && (t.childNS = arguments[2]),
          arguments.length > 4 && (t.type = arguments[3]),
          this._events[e] ? (this._events[e] = this._events[e].concat(t)) : (this._events[e] = [t]),
          (this._events[e] = this._events[e].sort((e, t) => {
            var n = 0,
              i = 0
            return (
              '*' == e.type && n++,
              '*' == e.childNS && n++,
              '*' == e.childName && n++,
              '*' == t.type && i++,
              '*' == t.childNS && i++,
              '*' == t.childName && i++,
              n > i ? 1 : n < i ? -1 : 0
            )
          })),
          this.oDbg.log("registered handler for event '" + e + "'", 2),
          this
        )
      }),
      (JSJaCConnection.prototype.unregisterHandler = function (e, t) {
        if (((e = e.toLowerCase()), !this._events[e])) return this
        for (var n = this._events[e], i = [], r = 0; r < n.length; r++)
          n[r].handler != t && i.push(n[r])
        return (
          n.length != i.length &&
            ((this._events[e] = i), this.oDbg.log("unregistered handler for event '" + e + "'", 2)),
          this
        )
      }),
      (JSJaCConnection.prototype.registerIQGet = function (e, t, n) {
        return this.registerHandler('iq', e, t, 'get', n)
      }),
      (JSJaCConnection.prototype.registerIQSet = function (e, t, n) {
        return this.registerHandler('iq', e, t, 'set', n)
      }),
      (JSJaCConnection.prototype.resume = function () {
        try {
          var e = JSJaCCookie.read(this._cookie_prefix + 'JSJaC_State').getValue()
          return (
            this.oDbg.log('read cookie: ' + e, 2),
            JSJaCCookie.read(this._cookie_prefix + 'JSJaC_State').erase(),
            this.resumeFromData(JSJaCJSON.parse(e))
          )
        } catch (e) {}
        return !1
      }),
      (JSJaCConnection.prototype.resumeFromData = function (e) {
        try {
          for (var t in e) Object.hasOwn(e, t) && (this[t] = e[t])
          if (this._keys) {
            this._keys2 = new JSJaCKeys()
            for (var n = this._keys2._getSuspendVars(), i = 0; i < n.length; i++)
              this._keys2[n[i]] = this._keys[n[i]]
            this._keys = this._keys2
          }
          return (
            this._connected
              ? (this._setStatus('resuming'),
                this._handleEvent('onresume'),
                setTimeout(JSJaC.bind(this._resume, this), this.getPollInterval()),
                (this._interval = setInterval(
                  JSJaC.bind(this._checkQueue, this),
                  JSJAC_CHECKQUEUEINTERVAL
                )),
                (this._inQto = setInterval(
                  JSJaC.bind(this._checkInQ, this),
                  JSJAC_CHECKINQUEUEINTERVAL
                )))
              : this._setStatus('terminated'),
            !0 === this._connected
          )
        } catch (e) {
          return (
            e.message
              ? this.oDbg.log('Resume failed: ' + e.message, 1)
              : this.oDbg.log('Resume failed: ' + e, 1),
            !1
          )
        }
      }),
      (JSJaCConnection.prototype.send = function (e, t, n) {
        return e && e.pType
          ? !!this.connected() &&
              (t && (e.getID() || e.setID('JSJaCID_' + this._ID++), this._registerPID(e, t, n)),
              (this._pQueue = this._pQueue.concat(e.xml())),
              this._handleEvent(e.pType() + '_out', e),
              this._handleEvent('packet_out', e),
              !0)
          : (this.oDbg.log('no packet: ' + e, 1), !1)
      }),
      (JSJaCConnection.prototype.sendIQ = function (e, t, n) {
        if (!e || 'iq' != e.pType()) return !1
        var i =
            (t = t || {}).error_handler ||
            JSJaC.bind(function (e) {
              this.oDbg.log(e.xml(), 1)
            }, this),
          r =
            t.result_handler ||
            JSJaC.bind(function (e) {
              this.oDbg.log(e.xml(), 2)
            }, this)
        return this.send(
          e,
          (e, t) => {
            switch (e.getType()) {
              case 'error':
                i(e)
                break
              case 'result':
                r(e, t)
            }
          },
          n
        )
      }),
      (JSJaCConnection.prototype.setPollInterval = function (e) {
        return e && !isNaN(e) && (this._timerval = e), this._timerval
      }),
      (JSJaCConnection.prototype.status = function () {
        return this._status
      }),
      (JSJaCConnection.prototype.suspend = function () {
        var e = this.suspendToData()
        try {
          var t = new JSJaCCookie(this._cookie_prefix + 'JSJaC_State', JSJaCJSON.toString(e))
          this.oDbg.log(
            'writing cookie: ' + t.getValue() + '\n(length:' + t.getValue().length + ')',
            2
          ),
            t.write()
          var n = JSJaCCookie.get(this._cookie_prefix + 'JSJaC_State')
          return (
            t.getValue() == n ||
            (this.oDbg.log('Suspend failed writing cookie.\nread: ' + n, 1), t.erase(), !1)
          )
        } catch (e) {
          this.oDbg.log(
            "Failed creating cookie '" + this._cookie_prefix + "JSJaC_State': " + e.message,
            1
          )
        }
        return !1
      }),
      (JSJaCConnection.prototype.suspendToData = function () {
        clearTimeout(this._timeout),
          clearInterval(this._interval),
          clearInterval(this._inQto),
          this._suspend()
        var e =
          '_connected,_keys,_ID,_xmllang,_inQ,_pQueue,_regIDs,_errcnt,_inactivity,domain,username,resource,jid,fulljid,_sid,_httpbase,_timerval,_is_polling'.split(
            ','
          )
        e = e.concat(this._getSuspendVars())
        for (var t = {}, n = 0; n < e.length; n++)
          if (this[e[n]]) {
            var i = {}
            if (this[e[n]]._getSuspendVars)
              for (var r = this[e[n]]._getSuspendVars(), s = 0; s < r.length; s++)
                i[r[s]] = this[e[n]][r[s]]
            else i = this[e[n]]
            t[e[n]] = i
          }
        return (this._connected = !1), this._setStatus('suspending'), t
      }),
      (JSJaCConnection.prototype._abort = function () {
        clearTimeout(this._timeout),
          clearInterval(this._inQto),
          clearInterval(this._interval),
          (this._connected = !1),
          this._setStatus('aborted'),
          this.oDbg.log('Disconnected.', 1),
          this._handleEvent('ondisconnect'),
          this._handleEvent('onerror', JSJaCError('500', 'cancel', 'service-unavailable'))
      }),
      (JSJaCConnection.prototype._checkInQ = function () {
        for (var e = 0; e < this._inQ.length && e < 10; e++) {
          var t = this._inQ[0]
          this._inQ = this._inQ.slice(1, this._inQ.length)
          var n = JSJaCPacket.wrapNode(t)
          if (!n) return
          this._handleEvent('packet_in', n),
            n.pType &&
              !this._handlePID(n) &&
              (this._handleEvent(n.pType() + '_in', n), this._handleEvent(n.pType(), n))
        }
      }),
      (JSJaCConnection.prototype._checkQueue = function () {
        return this._pQueue.length > 0 && this._process(), !0
      }),
      (JSJaCConnection.prototype._doAuth = function () {
        return (
          this.has_sasl &&
            'nonsasl' == this.authtype &&
            this.oDbg.log('Warning: SASL present but not used', 1),
          !(!this._doSASLAuth() && !this._doLegacyAuth()) ||
            (this.oDbg.log('Auth failed for authtype ' + this.authtype, 1), this.disconnect(), !1)
        )
      }),
      (JSJaCConnection.prototype._doInBandReg = function () {
        if ('saslanon' != this.authtype && 'anonymous' != this.authtype) {
          var e = new JSJaCIQ()
          e.setType('set'),
            e.setID('reg1'),
            e.appendNode(
              'query',
              {
                xmlns: NS_REGISTER,
              },
              [
                ['username', this.username],
                ['password', this.pass],
              ]
            ),
            this.send(e, this._doInBandRegDone)
        }
      }),
      (JSJaCConnection.prototype._doInBandRegDone = function (e) {
        if (e && 'error' == e.getType())
          return (
            this.oDbg.log('registration failed for ' + this.username, 0),
            void this._handleEvent('onerror', e.getChild('error'))
          )
        this.oDbg.log(this.username + ' registered succesfully', 0), this._doAuth()
      }),
      (JSJaCConnection.prototype._doLegacyAuth = function () {
        if ('nonsasl' != this.authtype && 'anonymous' != this.authtype) return !1
        var e = new JSJaCIQ()
        return (
          e.setIQ(null, 'get', 'auth1'),
          e.appendNode(
            'query',
            {
              xmlns: NS_AUTH,
            },
            [['username', this.username]]
          ),
          this.send(e, this._doLegacyAuth2),
          !0
        )
      }),
      (JSJaCConnection.prototype._doLegacyAuth2 = function (e) {
        if (!e || 'result' != e.getType())
          return (
            e && 'error' == e.getType() && this._handleEvent('onerror', e.getChild('error')),
            void this.disconnect()
          )
        var t = null !== e.getChild('digest'),
          n = new JSJaCIQ()
        n.setIQ(null, 'set', 'auth2')
        var i = n.appendNode(
          'query',
          {
            xmlns: NS_AUTH,
          },
          [
            ['username', this.username],
            ['resource', this.resource],
          ]
        )
        if (t)
          i.appendChild(
            n.buildNode(
              'digest',
              {
                xmlns: NS_AUTH,
              },
              hex_sha1(this.streamid + this.pass)
            )
          )
        else {
          if (!this._allow_plain)
            return this.oDbg.log('no valid login mechanism found', 1), void this.disconnect()
          i.appendChild(
            n.buildNode(
              'password',
              {
                xmlns: NS_AUTH,
              },
              this.pass
            )
          )
        }
        this.send(n, this._doLegacyAuthDone)
      }),
      (JSJaCConnection.prototype._doLegacyAuthDone = function (e) {
        'result' != e.getType()
          ? ('error' == e.getType() && this._handleEvent('onerror', e.getChild('error')),
            this.disconnect())
          : this._handleEvent('onconnect')
      }),
      (JSJaCConnection.prototype._doSASLAuth = function () {
        if ('nonsasl' == this.authtype || 'anonymous' == this.authtype) return !1
        if ('saslanon' == this.authtype) {
          if (this.mechs.ANONYMOUS)
            return (
              this.oDbg.log("SASL using mechanism 'ANONYMOUS'", 2),
              this._sendRaw(
                "<auth xmlns='urn:ietf:params:xml:ns:xmpp-sasl' mechanism='ANONYMOUS'/>",
                this._doSASLAuthDone
              )
            )
          this.oDbg.log('SASL ANONYMOUS requested but not supported', 1)
        } else {
          if (this._allow_scram && this.mechs['SCRAM-SHA-1']) {
            this.oDbg.log("SASL using mechanism 'SCRAM-SHA-1'", 2),
              (this._clientFirstMessageBare =
                'n=' +
                this.username.replace(/=/g, '=3D').replace(/,/g, '=2C') +
                ',r=' +
                JSJaCUtils.cnonce(16))
            var e =
              (this.authzid
                ? 'n,a=' + this.authzid.replace(/=/g, '=3D').replace(/,/g, '=2C') + ','
                : 'n,,') + this._clientFirstMessageBare
            return this._sendRaw(
              "<auth xmlns='urn:ietf:params:xml:ns:xmpp-sasl' mechanism='SCRAM-SHA-1'>" +
                b64encode(e) +
                '</auth>',
              this._doSASLAuthScramSha1S1
            )
          }
          if (this.mechs['DIGEST-MD5'])
            return (
              this.oDbg.log("SASL using mechanism 'DIGEST-MD5'", 2),
              this._sendRaw(
                "<auth xmlns='urn:ietf:params:xml:ns:xmpp-sasl' mechanism='DIGEST-MD5'/>",
                this._doSASLAuthDigestMd5S1
              )
            )
          if (this._allow_plain && this.mechs.PLAIN) {
            this.oDbg.log("SASL using mechanism 'PLAIN'", 2)
            var t =
              this.authzid +
              String.fromCharCode(0) +
              this.username +
              String.fromCharCode(0) +
              this.pass
            return (
              this.oDbg.log("authenticating with '" + t + "'", 2),
              (t = b64encode(t)),
              this._sendRaw(
                "<auth xmlns='urn:ietf:params:xml:ns:xmpp-sasl' mechanism='PLAIN'>" + t + '</auth>',
                this._doSASLAuthDone
              )
            )
          }
          this.oDbg.log('No SASL mechanism applied', 1), (this.authtype = 'nonsasl')
        }
        return !1
      }),
      (JSJaCConnection.prototype._doSASLAuthScramSha1S1 = function (e) {
        if ('challenge' != e.nodeName)
          this.oDbg.log('challenge missing', 1),
            this._handleEvent('onerror', JSJaCError('401', 'auth', 'not-authorized')),
            this.disconnect()
        else {
          var t = b64decode(e.firstChild.nodeValue)
          this.oDbg.log('got challenge: ' + t, 2)
          var n = {},
            i = t.split(',')
          for (var r in i)
            if (Object.hasOwn(i, r)) {
              var s = i[r].substring(2)
              n[i[r].substring(0, 1)] = s
            }
          for (
            var o,
              a,
              h = str2rstr_utf8(this.pass),
              u = b64decode_bin(n.s) + '\0\0\0',
              c = parseInt(n.i, 10),
              l = 0;
            l < c;
            l++
          )
            (u = rstr_hmac_sha1(h, u)), (o = JSJaCUtils.xor(o, u))
          a = this.authzid
            ? 'n,a=' + this.authzid.replace(/=/g, '=3D').replace(/,/g, '=2C') + ','
            : 'n,,'
          var p = 'c=' + b64encode(a) + ',r=' + n.r
          this._saltedPassword = o
          var d = rstr_hmac_sha1(this._saltedPassword, 'Client Key'),
            _ = rstr_sha1(d)
          this._authMessage = this._clientFirstMessageBare + ',' + t + ',' + p
          var g = rstr_hmac_sha1(_, str2rstr_utf8(this._authMessage)),
            m = p + ',p=' + rstr2b64(JSJaCUtils.xor(d, g))
          this.oDbg.log('response: ' + m, 2),
            this._sendRaw(
              "<response xmlns='urn:ietf:params:xml:ns:xmpp-sasl'>" + b64encode(m) + '</response>',
              this._doSASLAuthScramSha1S2
            )
        }
      }),
      (JSJaCConnection.prototype._doSASLAuthScramSha1S2 = function (e) {
        if ('success' != e.nodeName)
          this.oDbg.log('auth failed', 1),
            this._handleEvent('onerror', JSJaCError('401', 'auth', 'not-authorized')),
            this.disconnect()
        else {
          var t = b64decode(e.firstChild.nodeValue)
          this.oDbg.log('got success: ' + t, 2)
          var n = {},
            i = t.split(',')
          for (var r in i)
            if (Object.hasOwn(i, r)) {
              var s = i[r].substring(2)
              n[i[r].substring(0, 1)] = s
            }
          var o = rstr_hmac_sha1(this._saltedPassword, 'Server Key')
          rstr_hmac_sha1(o, str2rstr_utf8(this._authMessage)) !== b64decode_bin(n.v)
            ? (this.oDbg.log('server auth failed', 1),
              this._handleEvent('onerror', JSJaCError('401', 'auth', 'not-authorized')),
              this.disconnect())
            : this._reInitStream(JSJaC.bind(this._doStreamBind, this))
        }
      }),
      (JSJaCConnection.prototype._doSASLAuthDigestMd5S1 = function (e) {
        if ('challenge' != e.nodeName)
          this.oDbg.log('challenge missing', 1),
            this._handleEvent('onerror', JSJaCError('401', 'auth', 'not-authorized')),
            this.disconnect()
        else {
          var t,
            n = b64decode(e.firstChild.nodeValue)
          if ((this.oDbg.log('got challenge: ' + n, 2), -1 === (t = n.indexOf('nonce="'))))
            return this.oDbg.log('no valid nonce found, aborting', 1), void this.disconnect()
          ;(this._nonce = n.substring(t + 7)),
            (this._nonce = this._nonce.substring(0, this._nonce.indexOf('"'))),
            this.oDbg.log('nonce: ' + this._nonce, 2),
            -1 !== (t = n.indexOf('realm="')) &&
              ((this._realm = n.substring(t + 7)),
              (this._realm = this._realm.substring(0, this._realm.indexOf('"')))),
            (this._realm = this._realm || this.domain),
            this.oDbg.log('realm: ' + this._realm, 2),
            (this._digest_uri = 'xmpp/' + this.domain),
            (this._cnonce = JSJaCUtils.cnonce(14)),
            (this._nc = '00000001')
          var i =
            rstr_md5(str2rstr_utf8(this.username + ':' + this._realm + ':' + this.pass)) +
            ':' +
            this._nonce +
            ':' +
            this._cnonce
          this.authzid && (i = i + ':' + this.authzid)
          var r = rstr2hex(rstr_md5(i)),
            s = hex_md5('AUTHENTICATE:' + this._digest_uri),
            o = hex_md5(r + ':' + this._nonce + ':' + this._nc + ':' + this._cnonce + ':auth:' + s),
            a =
              'username="' +
              this.username +
              '",realm="' +
              this._realm +
              '",nonce="' +
              this._nonce +
              '",cnonce="' +
              this._cnonce +
              '",nc=' +
              this._nc +
              ',qop=auth,digest-uri="' +
              this._digest_uri +
              '",response=' +
              o +
              ',charset=utf-8'
          this.authzid && (a = 'authzid="' + this.authzid + '",' + a),
            this.oDbg.log('response: ' + a, 2),
            this._sendRaw(
              "<response xmlns='urn:ietf:params:xml:ns:xmpp-sasl'>" + b64encode(a) + '</response>',
              this._doSASLAuthDigestMd5S2
            )
        }
      }),
      (JSJaCConnection.prototype._doSASLAuthDigestMd5S2 = function (e) {
        if ('failure' == e.nodeName)
          return (
            e.xml ? this.oDbg.log('auth error: ' + e.xml, 1) : this.oDbg.log('auth error', 1),
            this._handleEvent('onerror', JSJaCError('401', 'auth', 'not-authorized')),
            void this.disconnect()
          )
        var t = b64decode(e.firstChild.nodeValue)
        this.oDbg.log('response: ' + t, 2)
        var n = t.substring(t.indexOf('rspauth=') + 8)
        this.oDbg.log('rspauth: ' + n, 2)
        var i =
          rstr_md5(str2rstr_utf8(this.username + ':' + this._realm + ':' + this.pass)) +
          ':' +
          this._nonce +
          ':' +
          this._cnonce
        this.authzid && (i = i + ':' + this.authzid)
        var r = rstr2hex(rstr_md5(i)),
          s = hex_md5(':' + this._digest_uri),
          o = hex_md5(r + ':' + this._nonce + ':' + this._nc + ':' + this._cnonce + ':auth:' + s)
        if ((this.oDbg.log('rsptest: ' + o, 2), o != n))
          return (
            this.oDbg.log('SASL Digest-MD5: server repsonse with wrong rspauth', 1),
            void this.disconnect()
          )
        'success' == e.nodeName
          ? this._reInitStream(JSJaC.bind(this._doStreamBind, this))
          : this._sendRaw(
              "<response xmlns='urn:ietf:params:xml:ns:xmpp-sasl'/>",
              this._doSASLAuthDone
            )
      }),
      (JSJaCConnection.prototype._doSASLAuthDone = function (e) {
        'success' !== e.nodeName
          ? (this.oDbg.log('auth failed', 1),
            this._handleEvent('onerror', JSJaCError('401', 'auth', 'not-authorized')),
            this.disconnect())
          : this._reInitStream(JSJaC.bind(this._doStreamBind, this))
      }),
      (JSJaCConnection.prototype._doStreamBind = function () {
        var e = new JSJaCIQ()
        e.setIQ(null, 'set', 'bind_1'),
          e.appendNode(
            'bind',
            {
              xmlns: NS_BIND,
            },
            [['resource', this.resource]]
          ),
          this.oDbg.log(e.xml()),
          this.send(e, this._doXMPPSess)
      }),
      (JSJaCConnection.prototype._doXMPPSess = function (e) {
        if ('result' != e.getType() || 'error' == e.getType())
          return (
            this.disconnect(),
            void ('error' == e.getType() && this._handleEvent('onerror', e.getChild('error')))
          )
        ;(this.fulljid = e.getChildVal('jid')),
          (this.jid = this.fulljid.substring(0, this.fulljid.lastIndexOf('/'))),
          (e = new JSJaCIQ()).setIQ(null, 'set', 'sess_1'),
          e.appendNode(
            'session',
            {
              xmlns: NS_SESSION,
            },
            []
          ),
          this.oDbg.log(e.xml()),
          this.send(e, this._doXMPPSessDone)
      }),
      (JSJaCConnection.prototype._doXMPPSessDone = function (e) {
        if ('result' != e.getType() || 'error' == e.getType())
          return (
            this.disconnect(),
            void ('error' == e.getType() && this._handleEvent('onerror', e.getChild('error')))
          )
        this._handleEvent('onconnect')
      }),
      (JSJaCConnection.prototype._handleEvent = function (e, t) {
        if (
          ((e = e.toLowerCase()), this.oDbg.log("incoming event '" + e + "'", 3), this._events[e])
        ) {
          this.oDbg.log("handling event '" + e + "'", 2)
          for (var n = 0; n < this._events[e].length; n++) {
            var i = this._events[e][n]
            if ('function' == typeof i.handler)
              if (t) {
                if (t.pType) {
                  if (
                    (!t.getNode().hasChildNodes() && '*' != i.childName) ||
                    (t.getNode().hasChildNodes() && !t.getChild(i.childName, i.childNS))
                  )
                    continue
                  if ('*' != i.type && t.getType() != i.type) continue
                  this.oDbg.log(
                    i.childName +
                      '/' +
                      i.childNS +
                      '/' +
                      i.type +
                      ' => match for handler ' +
                      i.handler,
                    3
                  )
                }
                if (i.handler(t)) break
              } else if (i.handler()) break
          }
        }
      }),
      (JSJaCConnection.prototype._handlePID = function (e) {
        if (!e.getID()) return !1
        var t = e.getFrom() || this.jid
        e.getFrom() == this.domain && (t = this.jid)
        var n = e.getID()
        if (this._regIDs[t] && this._regIDs[t][n]) {
          this.oDbg.log('handling id ' + n, 3)
          var i = this._regIDs[t][n]
          return !1 !== i.cb.call(this, e, i.arg) && (delete this._regIDs[t][n], !0)
        }
        return this.oDbg.log("not handling id '" + n + "' from jid " + t, 1), !1
      }),
      (JSJaCConnection.prototype._handleResponse = function (e) {
        var t = this._parseResponse(e)
        if (t)
          for (var n = 0; n < t.childNodes.length; n++)
            if (this._sendRawCallbacks.length) {
              var i = this._sendRawCallbacks[0]
              ;(this._sendRawCallbacks = this._sendRawCallbacks.slice(
                1,
                this._sendRawCallbacks.length
              )),
                i.fn.call(this, t.childNodes.item(n), i.arg)
            } else this._inQ = this._inQ.concat(t.childNodes.item(n))
      }),
      (JSJaCConnection.prototype._parseStreamFeatures = function (e) {
        if (!e) return this.oDbg.log('nothing to parse ... aborting', 1), !1
        var t, n
        if (e.getElementsByTagNameNS) t = e.getElementsByTagNameNS(NS_STREAM, 'error').item(0)
        else {
          var i = e.getElementsByTagName('error')
          for (n = 0; n < i.length; n++)
            if (i.item(n).namespaceURI == NS_STREAM || i.item(n).getAttribute('xmlns') == NS_STREAM) {
              t = i.item(n)
              break
            }
        }
        if (t)
          return (
            this._setStatus('internal_server_error'),
            clearTimeout(this._timeout),
            clearInterval(this._interval),
            clearInterval(this._inQto),
            this._handleEvent('onerror', JSJaCError('503', 'cancel', 'session-terminate')),
            (this._connected = !1),
            this.oDbg.log('Disconnected.', 1),
            this._handleEvent('ondisconnect'),
            !1
          )
        this.mechs = {}
        var r = e.getElementsByTagName('mechanisms')
        if (!r.length) return !1
        for (this.has_sasl = !1, n = 0; n < r.length; n++)
          if (r.item(n).getAttribute('xmlns') == NS_SASL) {
            this.has_sasl = !0
            for (var s = r.item(n).getElementsByTagName('mechanism'), o = 0; o < s.length; o++)
              this.mechs[s.item(o).firstChild.nodeValue] = !0
            break
          }
        return this.has_sasl
          ? (this.oDbg.log('SASL detected', 2), !0)
          : (this.oDbg.log('No support for SASL detected', 2), !0)
      }),
      (JSJaCConnection.prototype._process = function (e) {
        if (!this.connected())
          return (
            this.oDbg.log('Connection lost ...', 1),
            void (this._interval && clearInterval(this._interval))
          )
        this.setPollInterval(e), this._timeout && clearTimeout(this._timeout)
        var t = this._getFreeSlot()
        if (!(t < 0))
          if (void 0 === this._req[t] || void 0 === this._req[t].r || 4 == this._req[t].r.readyState)
            if (
              this.isPolling() ||
              0 !== this._pQueue.length ||
              !this._req[(t + 1) % 2] ||
              4 == this._req[(t + 1) % 2].r.readyState
            ) {
              this.isPolling() || this.oDbg.log('Found working slot at ' + t, 2),
                (this._req[t] = this._setupRequest(!0)),
                (this._req[t].r.onreadystatechange = JSJaC.bind(function () {
                  this.connected() &&
                    4 == this._req[t].r.readyState &&
                    (this.oDbg.log('async recv: ' + this._req[t].r.responseText, 4),
                    this._handleResponse(this._req[t]),
                    this._setStatus('processing'),
                    this._pQueue.length
                      ? (this._timeout = setTimeout(JSJaC.bind(this._process, this), 100))
                      : (this.oDbg.log(
                          'scheduling next poll in ' + this.getPollInterval() + ' msec',
                          4
                        ),
                        (this._timeout = setTimeout(
                          JSJaC.bind(this._process, this),
                          this.getPollInterval()
                        ))))
                }, this))
              try {
                this._req[t].r.onerror = JSJaC.bind(function () {
                  this.connected() &&
                    (this._errcnt++,
                    this.oDbg.log('XmlHttpRequest error (' + this._errcnt + ')', 1),
                    this._errcnt > JSJAC_ERR_COUNT
                      ? this._abort()
                      : (this._setStatus('onerror_fallback'),
                        setTimeout(JSJaC.bind(this._repeat, this), JSJAC_RETRYDELAY)))
                }, this)
              } catch (e) {}
              var n = this._getRequestString()
              void 0 !== this._rid && (this._req[t].rid = this._rid),
                this.oDbg.log('sending: ' + n, 4),
                this._req[t].r.send(n)
            } else this.oDbg.log('all slots busy, standby ...', 2)
          else this.oDbg.log('Slot ' + t + ' is not ready')
      }),
      (JSJaCConnection.prototype._registerPID = function (e, t, n) {
        this.oDbg.log('registering id for packet ' + e.xml(), 3)
        var i = e.getID()
        if (!i) return this.oDbg.log('id missing', 1), !1
        if ('function' != typeof t) return this.oDbg.log('callback is not a function', 1), !1
        var r = e.getTo() || this.jid
        return (
          e.getTo() == this.domain && (r = this.jid),
          this._regIDs[r] || (this._regIDs[r] = {}),
          null != this._regIDs[r][i]
            ? (this.oDbg.log('id already registered: ' + i, 1), !1)
            : ((this._regIDs[r][i] = {
                cb: t,
                arg: n,
                ts: JSJaCUtils.now(),
              }),
              this.oDbg.log('registered id ' + i, 3),
              this._cleanupRegisteredPIDs(),
              !0)
        )
      }),
      (JSJaCConnection.prototype._cleanupRegisteredPIDs = function () {
        var e = Date.now()
        for (var t in this._regIDs)
          if (Object.hasOwn(this._regIDs, t))
            for (var n in this._regIDs[t])
              Object.hasOwn(this._regIDs[t], n) &&
                this._regIDs[t][n].ts + JSJAC_REGID_TIMEOUT < e &&
                (this.oDbg.log("deleting registered id '" + n + "' due to timeout", 1),
                delete this._regIDs[t][n])
      }),
      (JSJaCConnection.prototype._prepSendEmpty = (e, t) => () => {
        t._sendEmpty(JSJaC.bind(e, t))
      }),
      (JSJaCConnection.prototype._sendEmpty = function (e) {
        var t = this._getFreeSlot()
        ;(this._req[t] = this._setupRequest(!0)),
          (this._req[t].r.onreadystatechange = JSJaC.bind(function () {
            4 == this._req[t].r.readyState &&
              (this.oDbg.log('async recv: ' + this._req[t].r.responseText, 4), e(this._req[t].r))
          }, this)),
          void 0 !== this._req[t].r.onerror &&
            (this._req[t].r.onerror = JSJaC.bind(function () {
              this.oDbg.log('XmlHttpRequest error', 1)
            }, this))
        var n = this._getRequestString()
        this.oDbg.log('sending: ' + n, 4), this._req[t].r.send(n)
      }),
      (JSJaCConnection.prototype._sendRaw = function (e, t, n) {
        return (
          t &&
            this._sendRawCallbacks.push({
              fn: t,
              arg: n,
            }),
          this._pQueue.push(e),
          this._process(),
          !0
        )
      }),
      (JSJaCConnection.prototype._setStatus = function (e) {
        e &&
          '' !== e &&
          e != this._status &&
          ((this._status = e),
          this._handleEvent('onstatuschanged', e),
          this._handleEvent('status_changed', e))
      }),
      (JSJaCHttpBindingConnection.prototype = new JSJaCConnection()),
      (JSJaCHttpBindingConnection.prototype.inherit = function (e) {
        if (e.jid) {
          var t = new JSJaCJID(e.jid)
          ;(this.domain = t.getDomain()),
            (this.username = t.getNode()),
            (this.resource = t.getResource())
        } else
          (this.domain = e.domain || 'localhost'),
            (this.username = e.username),
            (this.resource = e.resource)
        ;(this._sid = e.sid),
          (this._rid = e.rid),
          (this._min_polling = e.polling),
          (this._inactivity = e.inactivity),
          this._setHold(e.requests - 1),
          this.setPollInterval(this._timerval),
          e.wait && (this._wait = e.wait),
          (this._connected = !0),
          this._handleEvent('onconnect'),
          (this._interval = setInterval(
            JSJaC.bind(this._checkQueue, this),
            JSJAC_CHECKQUEUEINTERVAL
          )),
          (this._inQto = setInterval(JSJaC.bind(this._checkInQ, this), JSJAC_CHECKINQUEUEINTERVAL)),
          (this._timeout = setTimeout(JSJaC.bind(this._process, this), this.getPollInterval()))
      }),
      (JSJaCHttpBindingConnection.prototype.setPollInterval = function (e) {
        return (
          e &&
            !isNaN(e) &&
            (this.isPolling()
              ? this._min_polling && e < 1e3 * this._min_polling
                ? (this._timerval = 1e3 * this._min_polling)
                : this._inactivity && e > 1e3 * this._inactivity
                  ? (this._timerval = 1e3 * this._inactivity)
                  : (this._timerval = e)
              : (this._timerval = 100)),
          this._timerval
        )
      }),
      (JSJaCHttpBindingConnection.prototype.isPolling = function () {
        return 0 === this._hold
      }),
      (JSJaCHttpBindingConnection.prototype._getFreeSlot = function () {
        for (var e = 0; e < this._hold + 1; e++)
          if (void 0 === this._req[e] || void 0 === this._req[e].r || 4 == this._req[e].r.readyState)
            return e
        return -1
      }),
      (JSJaCHttpBindingConnection.prototype._getHold = function () {
        return this._hold
      }),
      (JSJaCHttpBindingConnection.prototype._getRequestString = function (e, t) {
        e = e || ''
        var n = ''
        if (this._rid <= this._last_rid && void 0 !== this._last_requests[this._rid])
          n = this._last_requests[this._rid].xml
        else {
          for (var i = ''; this._pQueue.length; ) {
            ;(i += this._pQueue[0]), (this._pQueue = this._pQueue.slice(1, this._pQueue.length))
          }
          for (var r in ((n =
            "<body rid='" +
            this._rid +
            "' sid='" +
            this._sid +
            "' xmlns='http://jabber.org/protocol/httpbind'"),
          (n += " key='" + this._keys.getKey() + "'"),
          this._keys.lastKey() &&
            ((this._keys = new JSJaCKeys(hex_sha1, this.oDbg)),
            (n += " newkey='" + this._keys.getKey() + "'")),
          t
            ? (n += " type='terminate'")
            : this._reinit &&
              ((n +=
                " xml:lang='" +
                this._xmllang +
                "' xmpp:restart='true' xmlns:xmpp='urn:xmpp:xbosh' to='" +
                this.domain +
                "'"),
              (this._reinit = !1)),
          (n += '' !== i || '' !== e ? '>' + e + i + '</body>' : '/>'),
          (this._last_requests[this._rid] = {}),
          (this._last_requests[this._rid].xml = n),
          (this._last_rid = this._rid),
          this._last_requests))
            Object.hasOwn(this._last_requests, r) &&
              r < this._rid - this._hold &&
              delete this._last_requests[r]
        }
        return n
      }),
      (JSJaCHttpBindingConnection.prototype._getInitialRequestString = function () {
        var e =
          "<body content='text/xml; charset=utf-8' hold='" +
          this._hold +
          "' xmlns='http://jabber.org/protocol/httpbind' to='" +
          this.authhost +
          "' wait='" +
          this._wait +
          "' rid='" +
          this._rid +
          "'"
        return (
          this.host && this.port && (e += " route='xmpp:" + this.host + ':' + this.port + "'"),
          (this._keys = new JSJaCKeys(hex_sha1, this.oDbg)),
          (e += " newkey='" + this._keys.getKey() + "'"),
          (e += " xml:lang='" + this._xmllang + "'"),
          (e += " ver='" + JSJACHBC_BOSH_VERSION + "'"),
          (e += " xmlns:xmpp='urn:xmpp:xbosh'"),
          ('sasl' != this.authtype && 'saslanon' != this.authtype) || (e += " xmpp:version='1.0'"),
          (e += '/>')
        )
      }),
      (JSJaCHttpBindingConnection.prototype._getStreamID = function (e) {
        if ((this.oDbg.log(e.responseText, 4), e.responseXML && e.responseXML.documentElement)) {
          var t = e.responseXML.documentElement
          'terminate' != t.getAttribute('type')
            ? (t.getAttribute('authid') &&
                ((this.streamid = t.getAttribute('authid')),
                this.oDbg.log('got streamid: ' + this.streamid, 2)),
              this._parseStreamFeatures(t)
                ? ((this._timeout = setTimeout(
                    JSJaC.bind(this._process, this),
                    this.getPollInterval()
                  )),
                  this.register ? this._doInBandReg() : this._doAuth())
                : this._sendEmpty(JSJaC.bind(this._getStreamID, this)))
            : this._handleEvent('onerror', JSJaCError('503', 'cancel', 'service-unavailable'))
        } else this._handleEvent('onerror', JSJaCError('503', 'cancel', 'service-unavailable'))
      }),
      (JSJaCHttpBindingConnection.prototype._getSuspendVars = () =>
        'host,port,_rid,_last_rid,_wait,_min_polling,_inactivity,_hold,_last_requests,_pause'.split(
          ','
        )),
      (JSJaCHttpBindingConnection.prototype._handleInitialResponse = function (e) {
        try {
          this.oDbg.log(e.getAllResponseHeaders(), 4), this.oDbg.log(e.responseText, 4)
        } catch (e) {
          this.oDbg.log('No response', 4)
        }
        if (200 != e.status || !e.responseXML)
          return (
            this.oDbg.log('initial response broken (status: ' + e.status + ')', 1),
            void this._handleEvent('onerror', JSJaCError('503', 'cancel', 'service-unavailable'))
          )
        var t = e.responseXML.documentElement
        return t && 'body' == t.tagName && t.namespaceURI == NS_BOSH
          ? 'terminate' == t.getAttribute('type')
            ? (this.oDbg.log('invalid response:\n' + e.responseText, 1),
              clearTimeout(this._timeout),
              (this._connected = !1),
              this.oDbg.log('Disconnected.', 1),
              this._handleEvent('ondisconnect'),
              void this._handleEvent('onerror', JSJaCError('503', 'cancel', 'service-unavailable')))
            : ((this._sid = t.getAttribute('sid')),
              this.oDbg.log('got sid: ' + this._sid, 2),
              t.getAttribute('polling') && (this._min_polling = t.getAttribute('polling')),
              t.getAttribute('inactivity') && (this._inactivity = t.getAttribute('inactivity')),
              t.getAttribute('requests') && this._setHold(t.getAttribute('requests') - 1),
              this.oDbg.log('set hold to ' + this._getHold(), 2),
              t.getAttribute('ver') && (this._bosh_version = t.getAttribute('ver')),
              t.getAttribute('maxpause') &&
                (this._pause = Number.min(t.getAttribute('maxpause'), JSJACHBC_MAXPAUSE)),
              this.setPollInterval(this._timerval),
              (this._connected = !0),
              (this._inQto = setInterval(
                JSJaC.bind(this._checkInQ, this),
                JSJAC_CHECKINQUEUEINTERVAL
              )),
              (this._interval = setInterval(
                JSJaC.bind(this._checkQueue, this),
                JSJAC_CHECKQUEUEINTERVAL
              )),
              void this._getStreamID(e))
          : (this.oDbg.log('no body element or incorrect body in initial response', 1),
            void this._handleEvent('onerror', JSJaCError('500', 'wait', 'internal-service-error')))
      }),
      (JSJaCHttpBindingConnection.prototype._parseResponse = function (e) {
        if (!this.connected() || !e) return null
        var t = e.r
        try {
          if (404 == t.status || 403 == t.status) return this._abort(), null
          if (200 != t.status || !t.responseXML) {
            this._errcnt++
            var n =
              'invalid response (' +
              t.status +
              '):\n' +
              t.getAllResponseHeaders() +
              '\n' +
              t.responseText
            return (
              t.responseXML || (n += '\nResponse failed to parse!'),
              this.oDbg.log(n, 1),
              this._errcnt > JSJAC_ERR_COUNT
                ? (this._abort(), null)
                : (this.connected() &&
                    (this.oDbg.log('repeating (' + this._errcnt + ')', 1),
                    this._setStatus('proto_error_fallback'),
                    setTimeout(JSJaC.bind(this._repeat, this), this.getPollInterval())),
                  null)
            )
          }
        } catch (e) {
          return (
            this.oDbg.log('XMLHttpRequest error: status not available', 1),
            this._errcnt++,
            this._errcnt > JSJAC_ERR_COUNT
              ? this._abort()
              : this.connected() &&
                (this.oDbg.log('repeating (' + this._errcnt + ')', 1),
                this._setStatus('proto_error_fallback'),
                setTimeout(JSJaC.bind(this._repeat, this), this.getPollInterval())),
            null
          )
        }
        var i = t.responseXML.documentElement
        if (!i || 'body' != i.tagName || i.namespaceURI != NS_BOSH)
          return (
            this.oDbg.log('invalid response:\n' + t.responseText, 1),
            clearTimeout(this._timeout),
            clearInterval(this._interval),
            clearInterval(this._inQto),
            (this._connected = !1),
            this.oDbg.log('Disconnected.', 1),
            this._handleEvent('ondisconnect'),
            this._setStatus('internal_server_error'),
            this._handleEvent('onerror', JSJaCError('500', 'wait', 'internal-server-error')),
            null
          )
        if (void 0 !== e.rid && this._last_requests[e.rid]) {
          if (this._last_requests[e.rid].handled)
            return this.oDbg.log('already handled ' + e.rid, 2), null
          this._last_requests[e.rid].handled = !0
        }
        if ('terminate' == i.getAttribute('type')) {
          var r = i.getAttribute('condition')
          this.oDbg.log('session terminated:\n' + t.responseText, 1),
            clearTimeout(this._timeout),
            clearInterval(this._interval),
            clearInterval(this._inQto)
          try {
            JSJaCCookie.read(this._cookie_prefix + 'JSJaC_State').erase()
          } catch (e) {}
          ;(this._connected = !1),
            'remote-stream-error' == r && i.getElementsByTagName('conflict').length > 0
              ? this._setStatus('session-terminate-conflict')
              : this._setStatus('terminated'),
            null === r && (r = 'session-terminate'),
            this._handleEvent('onerror', JSJaCError('503', 'cancel', r)),
            this.oDbg.log('Aborting remaining connections', 4)
          for (var s = 0; s < this._hold + 1; s++)
            try {
              this._req[s] && this._req[s] != e && this._req[s].r.abort()
            } catch (e) {
              this.oDbg.log(e, 1)
            }
          return (
            this.oDbg.log('parseResponse done with terminating', 3),
            this.oDbg.log('Disconnected.', 1),
            this._handleEvent('ondisconnect'),
            null
          )
        }
        return (this._errcnt = 0), t.responseXML.documentElement
      }),
      (JSJaCHttpBindingConnection.prototype._reInitStream = function (e) {
        ;(this._reinit = !0), this._sendEmpty(this._prepReInitStreamWait(e))
      }),
      (JSJaCHttpBindingConnection.prototype._prepReInitStreamWait = function (e) {
        return JSJaC.bind(function (t) {
          this._reInitStreamWait(t, e)
        }, this)
      }),
      (JSJaCHttpBindingConnection.prototype._reInitStreamWait = function (e, t) {
        this.oDbg.log('checking for stream features')
        var n,
          i,
          r = e.responseXML.documentElement
        if ((this.oDbg.log(r), r.getElementsByTagNameNS))
          this.oDbg.log('checking with namespace'),
            (n = r.getElementsByTagNameNS(NS_STREAM, 'features').item(0)) &&
              (i = n.getElementsByTagNameNS(NS_BIND, 'bind').item(0))
        else {
          var s,
            o,
            a = r.getElementsByTagName('stream:features')
          for (s = 0, o = a.length; s < o; s++)
            if (a.item(s).namespaceURI == NS_STREAM || a.item(s).getAttribute('xmlns') == NS_STREAM) {
              n = a.item(s)
              break
            }
          if (n)
            for (s = 0, o = (i = n.getElementsByTagName('bind')).length; s < o; s++)
              if (i.item(s).namespaceURI == NS_BIND || i.item(s).getAttribute('xmlns') == NS_BIND) {
                i = i.item(s)
                break
              }
        }
        this.oDbg.log(n),
          this.oDbg.log(i),
          n
            ? i
              ? t()
              : (this.oDbg.log('no bind feature - giving up', 1),
                this._handleEvent('onerror', JSJaCError('503', 'cancel', 'service-unavailable')),
                (this._connected = !1),
                this.oDbg.log('Disconnected.', 1),
                this._handleEvent('ondisconnect'))
            : this._sendEmpty(this._prepReInitStreamWait(t))
      }),
      (JSJaCHttpBindingConnection.prototype._repeat = function () {
        this._rid >= this._last_rid && (this._rid = this._last_rid - 1), this._process()
      }),
      (JSJaCHttpBindingConnection.prototype._resume = function () {
        0 === this._pause ? this._repeat() : this._process()
      }),
      (JSJaCHttpBindingConnection.prototype._setHold = function (e) {
        return (
          !e || isNaN(e) || e < 0 ? (e = 0) : e > JSJACHBC_MAX_HOLD && (e = JSJACHBC_MAX_HOLD),
          (this._hold = e),
          this._hold
        )
      }),
      (JSJaCHttpBindingConnection.prototype._setupRequest = function (e) {
        var t = {},
          n = XmlHttp.create()
        try {
          n.open('POST', this._httpbase, e),
            n.setRequestHeader('Content-Type', 'text/xml; charset=utf-8')
        } catch (e) {
          this.oDbg.log(e, 1)
        }
        return (t.r = n), this._rid++, (t.rid = this._rid), t
      }),
      (JSJaCHttpBindingConnection.prototype._suspend = function () {
        if (0 !== this._pause) {
          var e = this._getFreeSlot()
          this._req[e] = this._setupRequest(!1)
          var t =
            "<body pause='" +
            this._pause +
            "' xmlns='http://jabber.org/protocol/httpbind' sid='" +
            this._sid +
            "' rid='" +
            this._rid +
            "'"
          for (
            t += " key='" + this._keys.getKey() + "'",
              this._keys.lastKey() &&
                ((this._keys = new JSJaCKeys(hex_sha1, this.oDbg)),
                (t += " newkey='" + this._keys.getKey() + "'")),
              t += '>';
            this._pQueue.length;
          ) {
            ;(t += this._pQueue[0]), (this._pQueue = this._pQueue.slice(1, this._pQueue.length))
          }
          ;(t += '</body>'), this.oDbg.log('Disconnecting: ' + t, 4), this._req[e].r.send(t)
        }
      }),
      (JSJaCWebSocketConnection.prototype = new JSJaCConnection()),
      (JSJaCWebSocketConnection.prototype._cleanupWebSocket = function () {
        null !== this._ws &&
          ((this._ws.onclose = null),
          (this._ws.onerror = null),
          (this._ws.onopen = null),
          (this._ws.onmessage = null),
          this._ws.close(),
          (this._ws = null))
      }),
      (JSJaCWebSocketConnection.prototype.connect = function (e) {
        this._setStatus('connecting'),
          (this.domain = e.domain || 'localhost'),
          (this.username = e.username),
          (this.resource = e.resource),
          (this.pass = e.password || e.pass),
          (this.authzid = e.authzid || ''),
          (this.register = e.register),
          (this.authhost = e.authhost || this.domain),
          (this.authtype = e.authtype || 'sasl'),
          (this.jid = this.username + '@' + this.domain),
          (this.fulljid = this.jid + '/' + this.resource),
          e.allow_plain
            ? (this._allow_plain = e.allow_plain)
            : (this._allow_plain = JSJAC_ALLOW_PLAIN),
          e.allow_scram
            ? (this._allow_scram = e.allow_scram)
            : (this._allow_scram = JSJAC_ALLOW_SCRAM),
          e.xmllang && '' !== e.xmllang ? (this._xmllang = e.xmllang) : (this._xmllang = 'en'),
          'undefined' != typeof WebSocket
            ? ((this._ws = new WebSocket(this._httpbase, 'xmpp')),
              (this._ws.onclose = JSJaC.bind(this._onclose, this)),
              (this._ws.onerror = JSJaC.bind(this._onerror, this)),
              (this._ws.onopen = JSJaC.bind(this._onopen, this)))
            : this._handleEvent('onerror', JSJaCError('503', 'cancel', 'service-unavailable'))
      }),
      (JSJaCWebSocketConnection.prototype._onopen = function () {
        var e = this._getInitialRequestString()
        this.oDbg.log(e, 4),
          (this._ws.onmessage = JSJaC.bind(this._handleOpenStream, this)),
          this._ws.send(e)
      }),
      (JSJaCWebSocketConnection.prototype._handleOpenStream = function (e) {
        var t, n
        this.oDbg.log(e.data, 4),
          (t = e.data),
          (n = this._parseXml(t))
            ? ((this.streamid = n.getAttribute('id')),
              this.oDbg.log('got streamid: ' + this.streamid, 2),
              (this._ws.onmessage = JSJaC.bind(this._handleInitialResponse, this)))
            : this._handleEvent('onerror', JSJaCError('503', 'cancel', 'service-unavailable'))
      }),
      (JSJaCWebSocketConnection.prototype._handleInitialResponse = function (e) {
        var t = this._parseXml(e.data)
        this._parseStreamFeatures(t)
          ? ((this._connected = !0), this.register ? this._doInBandReg() : this._doAuth())
          : this._handleEvent('onerror', JSJaCError('503', 'cancel', 'service-unavailable'))
      }),
      (JSJaCWebSocketConnection.prototype.disconnect = function () {
        this._setStatus('disconnecting'),
          this.connected() &&
            ((this._connected = !1),
            this.oDbg.log('Disconnecting', 4),
            this._sendRaw(
              '<close xmlns="' + NS_FRAMING + '"/>',
              JSJaC.bind(this._cleanupWebSocket, this)
            ),
            this.oDbg.log('Disconnected', 2),
            this._handleEvent('ondisconnect'))
      }),
      (JSJaCWebSocketConnection.prototype._onclose = function () {
        this.oDbg.log('websocket closed', 2),
          'disconnecting' !== this._status &&
            ((this._connected = !1),
            this._handleEvent('onerror', JSJaCError('503', 'cancel', 'service-unavailable')))
      }),
      (JSJaCWebSocketConnection.prototype._onerror = function () {
        this.oDbg.log('websocket error', 1),
          (this._connected = !1),
          this._handleEvent('onerror', JSJaCError('503', 'cancel', 'service-unavailable'))
      }),
      (JSJaCWebSocketConnection.prototype._onmessage = function (e) {
        var t, n, i
        if (((t = e.data), this._setStatus('processing'), t && '' !== t)) {
          if ((n = this._parseXml(t)).namespaceURI === NS_STREAM && 'error' === n.localName)
            return (
              n.getElementsByTagNameNS(NS_STREAMS, 'conflict').length > 0 &&
                this._setStatus('session-terminate-conflict'),
              (this._connected = !1),
              void this._handleEvent('onerror', JSJaCError('503', 'cancel', 'remote-stream-error'))
            )
          ;(i = JSJaCPacket.wrapNode(n)) &&
            (this.oDbg.log('async recv: ' + e.data, 4),
            this._handleEvent('packet_in', i),
            i.pType &&
              !this._handlePID(i) &&
              (this._handleEvent(i.pType() + '_in', i), this._handleEvent(i.pType(), i)))
        }
      }),
      (JSJaCWebSocketConnection.prototype._parseXml = function (e) {
        var t
        this.oDbg.log('Parsing: ' + e, 4)
        try {
          if (((t = XmlDocument.create('stream', NS_STREAM)), 0 === e.lastIndexOf('<close ', 0))) {
            this.oDbg.log('session terminated', 1),
              clearTimeout(this._timeout),
              clearInterval(this._interval),
              clearInterval(this._inQto)
            try {
              JSJaCCookie.read(this._cookie_prefix + 'JSJaC_State').erase()
            } catch (e) {}
            return (
              (this._connected = !1),
              this._handleEvent('onerror', JSJaCError('503', 'cancel', 'session-terminate')),
              this.oDbg.log('Disconnected.', 1),
              this._handleEvent('ondisconnect'),
              null
            )
          }
          return t.loadXML(e), t.documentElement
        } catch (e) {
          this.oDbg.log('Error: ' + e),
            (this._connected = !1),
            this._handleEvent('onerror', JSJaCError('500', 'wait', 'internal-service-error'))
        }
        return null
      }),
      (JSJaCWebSocketConnection.prototype._getInitialRequestString = function () {
        var e
        return (
          (e = this.domain),
          this.authhost && (e = this.authhost),
          '<open xmlns="' + NS_FRAMING + '" to="' + e + '" version="1.0"/>'
        )
      }),
      (JSJaCWebSocketConnection.prototype.send = function (e, t, n) {
        if (!this.connected()) return !1
        if (!e || !e.pType) return this.oDbg.log('no packet: ' + e, 1), !1
        ;(this._ws.onmessage = JSJaC.bind(this._onmessage, this)),
          t && (e.getID() || e.setID('JSJaCID_' + this._ID++), this._registerPID(e, t, n))
        try {
          this._handleEvent(e.pType() + '_out', e),
            this._handleEvent('packet_out', e),
            this._ws.send(e.xml())
        } catch (e) {
          return this.oDbg.log(e.toString(), 1), !1
        }
        return !0
      }),
      (JSJaCWebSocketConnection.prototype.resume = () => !1),
      (JSJaCWebSocketConnection.prototype.suspend = () => !1),
      (JSJaCWebSocketConnection.prototype._doSASLAuthScramSha1S1 = function (e) {
        var t = this._parseXml(e.data)
        return JSJaC.bind(JSJaCConnection.prototype._doSASLAuthScramSha1S1, this)(t)
      }),
      (JSJaCWebSocketConnection.prototype._doSASLAuthScramSha1S2 = function (e) {
        var t = this._parseXml(e.data)
        return JSJaC.bind(JSJaCConnection.prototype._doSASLAuthScramSha1S2, this)(t)
      }),
      (JSJaCWebSocketConnection.prototype._doSASLAuthDigestMd5S1 = function (e) {
        var t = this._parseXml(e.data)
        return JSJaC.bind(JSJaCConnection.prototype._doSASLAuthDigestMd5S1, this)(t)
      }),
      (JSJaCWebSocketConnection.prototype._doSASLAuthDigestMd5S2 = function (e) {
        var t = this._parseXml(e.data)
        return JSJaC.bind(JSJaCConnection.prototype._doSASLAuthDigestMd5S2, this)(t)
      }),
      (JSJaCWebSocketConnection.prototype._doSASLAuthDone = function (e) {
        var t = this._parseXml(e.data)
        return JSJaC.bind(JSJaCConnection.prototype._doSASLAuthDone, this)(t)
      }),
      (JSJaCWebSocketConnection.prototype._reInitStream = function (e) {
        var t,
          n = this.domain
        this.authhost && (n = this.authhost),
          (t = '<open xmlns="' + NS_FRAMING + '" to="' + n + '" version="1.0"/>'),
          this._sendRaw(t, e)
      }),
      (JSJaCWebSocketConnection.prototype._sendRaw = function (e, t, n) {
        return (
          !!this._ws && (t && (this._ws.onmessage = JSJaC.bind(t, this, n)), this._ws.send(e), !0)
        )
      })
    var JSJaC = {
      Version: '1.4',
      require: e => {
        document.write('<script type="text/javascript" src="' + e + '"></script>')
      },
      load: function () {
        var e,
          t = [
            'xmlextras',
            'jsextras',
            'crypt',
            'JSJaCConfig',
            'JSJaCConstants',
            'JSJaCCookie',
            'JSJaCJSON',
            'JSJaCJID',
            'JSJaCUtils',
            'JSJaCBuilder',
            'JSJaCPacket',
            'JSJaCError',
            'JSJaCKeys',
            'JSJaCConnection',
            'JSJaCHttpPollingConnection',
            'JSJaCHttpBindingConnection',
            'JSJaCConsoleLogger',
            'JSJaCWebSocketConnection',
          ],
          n = document.getElementsByTagName('script'),
          i = './'
        for (e = 0; e < n.length; e++)
          if (n.item(e).src && n.item(e).src.match(/JSJaC\.js$/)) {
            i = n.item(e).src.replace(/JSJaC.js$/, '')
            break
          }
        for (e = 0; e < t.length; e++) this.require(i + t[e] + '.js')
      },
      bind: (e, t, n) => i => e.apply(t, [i, n]),
    }
    function WTAPI() {
      ;(this.version = '@VERSION@'),
        (this.applicationId = ''),
        (this.redirectUri = ''),
        (this.storage = sessionStorage),
        (this.state = 'wtapiAuth'),
        (this.server = 'wildix'),
        (this.resource_prefix = 'wtapi'),
        (this.licenseType = ''),
        (this.connected = !1),
        (this.connecting = !1),
        (this.handlers = {}),
        WTAPI.Observable.call(this)
      for (var e = 0; e < this.plugins.length; e++) {
        var t = this.plugins[e],
          n = new t.cls(this)
        this[t.name] = n
      }
    }
    void 0 === JSJaCConnection && JSJaC.load(),
      (WTAPI.Observable = function () {
        this._listeners = {}
      }),
      (WTAPI.Observable.prototype.addListener = function (e, t) {
        var n = {
          callback: t,
          scope: arguments[2] || this,
        }
        void 0 === this._listeners[e] ? (this._listeners[e] = [n]) : this._listeners[e].push(n)
      }),
      (WTAPI.Observable.prototype.on = WTAPI.Observable.prototype.addListener),
      (WTAPI.Observable.prototype.removeListener = function (e, t) {
        var n = this._listeners[e]
        if (void 0 !== n) {
          for (var i = [], r = 0; r < n.length; r++) n[r].callback != t && i.push(n[r])
          this._listeners[e] = i
        }
      }),
      (WTAPI.Observable.prototype._fire = function (e) {
        var t = this._listeners[e],
          n = Array.prototype.slice.call(arguments, 1, arguments.length)
        if (void 0 !== t)
          for (var i = 0; i < t.length; i++) {
            var r = t[i]
            r.callback.apply(r.scope, n)
          }
      }),
      (WTAPI.prototype = Object.create(WTAPI.Observable.prototype)),
      (WTAPI.prototype.plugins = []),
      (WTAPI.addPlugin = (e, t) => {
        var n = {
          name: e,
          cls: t,
        }
        WTAPI.prototype.plugins.push(n)
      }),
      (WTAPI.prototype.setStorage = function (e) {
        this.storage = e instanceof Storage ? e : sessionStorage
      }),
      (WTAPI.prototype.setOptions = function (e) {
        const t = e.pbxUrl,
          n = {
            host: '',
            protocol: 'https:',
            path: '/authorization/oauth2',
          },
          i = t.replace(n.protocol + '//', '').split('/')
        ;(n.host = i[0]),
          (this.pbxUrl = n.protocol + '//' + n.host),
          (this.applicationId = e.applicationId),
          (this.redirectUri = e.redirectUri),
          (this.responseType = 'string' == typeof e.responseType ? e.responseType : 'token'),
          (this.scope = 'string' == typeof e.scope ? e.scope : ''),
          (this.prompt = 'string' == typeof e.prompt ? e.prompt : 'consent'),
          (this.resource_postfix = Math.round(1e4 * Math.random())),
          (this.recon_time = 0),
          (this.recon_timeout = !1),
          (this.recon_timeout_min = 2),
          (this.recon_timeout_max = 16),
          (this.recon_timeout_skip = 360),
          (this.recon_inactivity = 45),
          (this.verify_time = !1),
          (this.verify_timeout = 1),
          (this.con = !1),
          (this.con_id = 0),
          (this.con_rid = !1),
          (this.con_secs = 0),
          (this.con_url = t),
          (this.host = n.host),
          (this.protocol = n.protocol),
          (this.authorizationUri = n.path),
          (this.con_errors = []),
          (this.con_wait = 30),
          (this.con_debuger = null),
          (this.con_props = {
            httpbase: this.con_url,
            wait: this.con_wait,
            oDbg: this.con_debuger,
          }),
          (WTAPI.ajax.settings.host = this.host),
          (WTAPI.ajax.settings.protocol = this.protocol),
          (this.extension = ''),
          (this.password = ''),
          (this.resource = this._makeResource('', '', this.resource_prefix, this.resource_postfix)),
          (this.jid = '@' + this.server),
          (this.jid_full = this.jid + '/' + this.resource),
          (this.sid = this._makeUniqueId('', '', 'wtapi'))
      }),
      (WTAPI.prototype.handleAuthorizationResponse = function () {
        const e = this._parseParamsFromString(location.hash.substring(1))
        ;(('string' == typeof e.access_token && e.access_token.length > 0) ||
          'string' == typeof e.error) &&
          'string' == typeof e.state &&
          e.state === this.state &&
          ((e.response_type = 'token'), this._sendParamsToOpener(e))
      }),
      (WTAPI.prototype.connect = function () {
        this.con_reconnect = !0
        const e = {
            client_id: this.applicationId,
            redirect_uri: this.redirectUri,
            response_type: this.responseType,
            scope: this.scope,
            state: this.state,
            prompt: this.prompt,
          },
          t = new URLSearchParams(e).toString()
        window.open(
          `${this.protocol}//${this.host}${this.authorizationUri}?${t}&wtapiVersion=2`,
          'wtapiOAuthWin',
          'width=600,height=700,left=0,top=0'
        )
      }),
      (WTAPI.prototype.restoreSavedCredentials = function () {
        const e = this.getCredentials()
        e &&
          'string' == typeof e.accessToken &&
          (this.setOptions(e),
          WTAPI.ajax.setAuthorizationToken(e.accessToken),
          this._getPersonalInfo()),
          this._fire('restoreCredentials', e)
      }),
      (WTAPI.prototype.deleteSavedCredentials = function () {
        this.storage.removeItem(this.resource_prefix)
      }),
      (WTAPI.prototype.getCredentials = function () {
        let e = this.storage.getItem(this.resource_prefix)
        try {
          e = JSON.parse(e)
        } catch (t) {
          e = null
        }
        return e
      }),
      (WTAPI.prototype._saveCredentials = function (e) {
        const t = {
          accessToken: e.access_token,
          expires: new Date().getTime() + 1e3 * e.expires_in,
          applicationId: this.applicationId,
          redirectUri: this.redirectUri,
          responseType: this.responseType,
          pbxUrl: this.pbxUrl,
        }
        this.storage.setItem(this.resource_prefix, JSON.stringify(t))
      }),
      (WTAPI.prototype._parseParamsFromString = e => {
        const t = {}
        let n,
          i = /([^&=]+)=([^&]*)/g
        for (; (n = i.exec(e)); ) t[decodeURIComponent(n[1])] = decodeURIComponent(n[2])
        return t
      }),
      (WTAPI.prototype._sendParamsToOpener = e => {
        if ('function' != typeof window.opener.oauth2Callback) {
          const e = 'Not found function oauth2Callback on the opener window. Please check it.'
          return window.opener.console.error(e), (window.document.body.innerText = e), !1
        }
        window.opener.oauth2Callback(e), window.close()
      }),
      (WTAPI.prototype.handleCallbackData = function (e) {
        void 0 !== e.error
          ? (this.disconnect(), this._fire('oauthAuthorizationError', e))
          : 'token' === e.response_type &&
            (this._saveCredentials(e),
            WTAPI.ajax.setAuthorizationToken(e.access_token),
            this._getPersonalInfo()
              .then(() => this._sendLogs())
              .catch(() => console.log('Error get personal info')),
            this._fire('oauthAuthorizationSuccess', e))
      }),
      (WTAPI.prototype._sendLogs = function () {
        localStorage.getItem('wtapi2_' + this.server) ||
          this._getPbxInfo()
            .then(() => {
              WTAPI.ajax({
                protocol: 'https:',
                host: 'feedback.wildix.com',
                url: '/api/v1/Analytics/wtapi',
                type: 'POST',
                data: {
                  event: 'authorization',
                  data: JSON.stringify({
                    license: this.getLicenseType(),
                    userExtension: this.getExtension(),
                    userJid: this.getFullJid(),
                    pbxSerial: this.pbxSerial,
                    pbxVersion: this.pbxVersion,
                    pbxDomain: this.server,
                    wtapiVersion: this.getVersion(),
                  }),
                },
                success: () => localStorage.setItem('wtapi2_' + this.server, '1'),
                error: () => console.log('Error sending logs'),
              })
            })
            .catch(() => console.log('Error get pbx info'))
      }),
      (WTAPI.prototype._getPbxInfo = function () {
        return (
          (this.pbxSerial = ''),
          (this.pbxVersion = ''),
          new Promise((e, t) => {
            WTAPI.ajax({
              url: '/api/v1/ios/config/',
              type: 'GET',
              data: {
                fields: 'pbxInfo',
              },
              success: t => {
                'result' === t.type &&
                  t.result &&
                  ((this.pbxSerial = t.result.pbxInfo.serial ? t.result.pbxInfo.serial : ''),
                  (this.pbxVersion = t.result.pbxInfo.version)),
                  e()
              },
              error: () => t(),
            })
          })
        )
      }),
      (WTAPI.prototype._getPersonalInfo = function () {
        return (
          (this.extension = ''),
          (this.password = ''),
          (this.jid = ''),
          (this.jid_full = ''),
          (this.sid = ''),
          new Promise((e, t) => {
            WTAPI.ajax({
              url: '/api/v1/personal/info',
              type: 'GET',
              data: {
                fields: 'extension,name,jid,password,email,login,licenseType',
              },
              success: this._proxy(function (t, n, i) {
                if ('result' == t.type && t.result)
                  if (
                    ((this.extension = t.result.extension),
                    Object.hasOwn(t.result, 'password') && (this.password = t.result.password),
                    (this.resource = this._makeResource(
                      this.extension,
                      this.password,
                      this.resource_prefix,
                      this.resource_postfix
                    )),
                    (this.jid = this.extension + '@' + this.server),
                    (this.jid_full = this.jid + '/' + this.resource),
                    (this.sid = this._makeUniqueId(this.extension, this.password, 'wtapi')),
                    (this.licenseType = t.result.licenseType),
                    this.extension && Object.hasOwn(t.result, 'jid'))
                  ) {
                    var r = new JSJaCJID(t.result.jid)
                    ;(this.server = r.getDomain()),
                      (this.jid = t.result.jid),
                      (this.jid_full = this.jid + '/' + this.resource),
                      (this.con_props.httpbase =
                        ('http:' == this.protocol ? 'ws' : 'wss') + '://' + this.host + '/xmpp/'),
                      this._connect(!0)
                  } else this._connect(), this._verify()
                e()
              }, this),
              error: this._proxy(function (e, n, i) {
                var r = e.statusText
                if (e && e.responseText)
                  try {
                    var s = JSON.parse(e.responseText)
                    s.type && 'error' == s.type && (r = s.reason)
                  } catch (e) {}
                this._fire('disconnected', r), t()
              }, this),
            })
          })
        )
      }),
      (WTAPI.prototype._connect = function (e) {
        ;(e = e || !1),
          this.con_id++,
          (this.con = e
            ? new JSJaCWebSocketConnection(this.con_props)
            : new JSJaCHttpBindingConnection(this.con_props)),
          this.con.registerHandler('onconnect', this._proxy(this._handleConnected, this)),
          this.con.registerHandler('ondisconnect', this._proxy(this._handleDisconnected, this)),
          this.con.registerHandler('onerror', this._proxy(this._handleConnectionError, this)),
          this.con.registerHandler('presence', this._proxy(this._handlePresence, this)),
          this.con.registerHandler('message', this._proxy(this._handleMessage, this)),
          this.con.registerHandler('iq', this._proxy(this._handleIQ, this)),
          this.con.registerHandler('iq', 'ping', 'urn:xmpp:ping', this._proxy(this._handlePing, this))
        var t = {
          domain: this.server,
          username: this.extension,
          pass: this.password,
          resource: this.resource,
          register: !1,
        }
        this.connecting = !0
        try {
          this.con.connect(t)
        } catch (e) {
          console.log(e)
        }
      }),
      (WTAPI.prototype.disconnect = function () {
        ;(this.con_reconnect = !1), this._disconnect()
      }),
      (WTAPI.prototype._disconnect = function () {
        this.connected = !1
        try {
          this.con.disconnect()
        } catch (e) {
          this.con_errors.push(e)
        }
      }),
      (WTAPI.prototype.isNewServer = function () {
        return 'wildix' != this.server
      }),
      (WTAPI.prototype.getConnection = function () {
        return this.con
      }),
      (WTAPI.prototype.isConnected = function () {
        return this.connected
      }),
      (WTAPI.prototype.registerHandler = function (e, t, n, i) {
        var r = {
          callback: t,
          scope: n,
          priotiry: i,
        }
        void 0 === this.handlers[e]
          ? (this.handlers[e] = [r])
          : (this.handlers[e].push(r), this.handlers[e].sort(this._priorityComparator))
      }),
      (WTAPI.prototype.unregisterHandler = function (e, t) {
        var n = this.handlers[e]
        if (void 0 !== n) {
          for (var i = [], r = 0; r < n.length; r++) n[r].callback != t && i.push(n[r])
          this.handlers[e] = i
        }
      }),
      (WTAPI.prototype.getExtension = function () {
        return this.extension
      }),
      (WTAPI.prototype.getJid = function () {
        return this.jid
      }),
      (WTAPI.prototype.getFullJid = function () {
        return this.jid_full
      }),
      (WTAPI.prototype.getLicenseType = function () {
        return this.licenseType
      }),
      (WTAPI.prototype.getVersion = function () {
        return this.version
      }),
      (WTAPI.prototype._execute = function (e, t) {
        var n = this.handlers[e]
        if (void 0 !== n)
          for (var i = 0; i < n.length; i++) {
            var r = n[i]
            if (r.callback.apply(r.scope, t)) break
          }
      }),
      (WTAPI.prototype._handleConnected = function () {
        ;(this.connecting = !1), (this.connected = !0), this._fire('connected')
        var e = this.con_id
        setTimeout(function () {
          e == this.con_id && ((this.recon_time = !1), (this.recon_timeout = !1))
        }, 1e3 * this.recon_timeout_skip)
        var t = new JSJaCPresence()
        this.con.send(t)
      }),
      (WTAPI.prototype._handleConnectionError = function (e) {
        '503' == e.getAttribute('code') &&
          e.firstChild &&
          'remote-stream-error' == e.firstChild.tagName &&
          ((this.resource_postfix = Math.round(1e4 * Math.random())),
          (this.resource = this._makeResource(
            this.extension,
            this.password,
            this.resource_prefix,
            this.resource_postfix
          )),
          (this.jid_full = this.jid + '/' + this.resource)),
          this._connected ||
            (this.con_errors.push(e), this._disconnect(), this._handleDisconnected()),
          this.con_errors.push(e),
          (this.connecting = !1)
      }),
      (WTAPI.prototype._handleDisconnected = function () {
        var e
        if (this.con_errors.length > 0 && (e = this.con_errors[0]) instanceof Node) {
          var t = document.createElement('div')
          t.appendChild(this.con_errors[0]), (e = t.innerHTML)
        }
        ;(this.connected = !1), (this.connecting = !1), this._fire('disconnected', e)
      }),
      (WTAPI.prototype._handlePresence = function () {
        this._execute('presence', arguments)
      }),
      (WTAPI.prototype._handleMessage = function () {
        this._execute('message', arguments)
      }),
      (WTAPI.prototype._handleIQ = function () {
        this._execute('iq', arguments)
      }),
      (WTAPI.prototype._handlePing = function (e) {
        var t = new JSJaCIQ()
        t.setTo(e.getFrom()), t.setType('result'), t.setID(e.getID()), this.con.send(t)
      }),
      (WTAPI.prototype._verify = function () {
        var e = Math.round(new Date().getTime() / 1e3)
        if (this.con_reconnect)
          if (this.con_errors.length > 0)
            (this.con_errors = []),
              (this.recon_time = this.verify_timeout),
              (this.recon_timeout = this._random(this.recon_timeout_min, this.recon_timeout_max))
          else if (0 == this.connected && 0 == this.connecting)
            this.recon_time
              ? this.recon_time >= this.recon_timeout
                ? this._connect()
                : (this.recon_time += this.verify_timeout)
              : this._connect()
          else if (1 == this.connected) {
            if (
              ((this.con_secs += this.verify_timeout),
              this.con_rid != this.con._rid
                ? ((this.con_rid = this.con._rid), (this.con_secs = 0))
                : this.con_secs > this.recon_inactivity &&
                  this.connected &&
                  !this.connecting &&
                  (this.con_errors.push('Found this connection is not alive!'), this._disconnect()),
              this.verify_time)
            )
              Math.abs(e - this.verify_time) > this.con_wait &&
                (this.connecting ||
                  (this.con_errors.push('Found this computer was in sleep mode'), this._disconnect()))
          }
        ;(this.verify_time = e),
          setTimeout(this._proxy(this._verify, this), 1e3 * this.verify_timeout)
      }),
      (WTAPI.prototype._makeResource = (e, t, n, i) => {
        for (
          var r = e + '-' + t + '-' + window.location.protocol + '-' + navigator.userAgent,
            s = 352654597,
            o = s,
            a = 0,
            h = '';
          a < r.length && ((s = ((s << 5) + s + (s >> 27)) ^ r.charCodeAt(a)), a != r.length - 1);
        )
          (o = ((o << 5) + o + (o >> 27)) ^ r.charCodeAt(a + 1)), (a += 2)
        return (
          (s = new String(s)),
          (o = new String(1566083941 * o)),
          (h = n + '-' + e + '-' + s.substr(s.length - 4, 4) + '-' + o.substr(s.length - 4, 4)),
          i && (h = h + '-' + i),
          h
        )
      }),
      (WTAPI.prototype._makeUniqueId = (e, t, n) => {
        for (
          var i = e + t + window.location.protocol + navigator.userAgent + Math.random(),
            r = 352654597,
            s = r,
            o = 0;
          o < i.length && ((r = ((r << 5) + r + (r >> 27)) ^ i.charCodeAt(o)), o != i.length - 1);
        )
          (s = ((s << 5) + s + (s >> 27)) ^ i.charCodeAt(o + 1)), (o += 2)
        return (
          (r = new String(r)),
          (s = new String(1566083941 * s)),
          n + '_' + e + '_' + r.substr(r.length - 4, 4) + '_' + s.substr(r.length - 4, 4)
        )
      }),
      (WTAPI.prototype._random = (e, t) => Math.floor(Math.random() * (t - e + 1) + e)),
      (WTAPI.prototype._proxy = (e, t) =>
        function () {
          e.apply(t, arguments)
        }),
      (WTAPI.prototype._priorityComparator = (e, t) =>
        e.priotiry < t.priotiry ? -1 : e.priotiry > t.priotiry ? 1 : 0),
      (WTAPI.User = function (e, t) {
        ;(this._id = WTAPI.User._id++),
          (this._jid = e),
          (this._name = t || null),
          (this._group = null)
        var n = this._jid.split('@')
        n.length > 1 && ('172.16.0.6' == n[1] || 'kite.wildix.com' == n[1]) && (this._group = 'Kite'),
          (this._extension = n[0])
      }),
      (WTAPI.User._id = 1),
      (WTAPI.User.prototype.getId = function () {
        return this._jid
      }),
      (WTAPI.User.prototype.getJid = function () {
        return this._jid
      }),
      (WTAPI.User.prototype.getName = function () {
        return this._name
      }),
      (WTAPI.User.prototype.setName = function (e) {
        this._name = e
      }),
      (WTAPI.User.prototype.getExtension = function () {
        return this._extension
      }),
      (WTAPI.User.prototype.isGroupExist = function () {
        return null !== this._group
      }),
      (WTAPI.User.prototype.getGroup = function () {
        return this._group
      }),
      (WTAPI.User.prototype.setGroup = function (e) {
        this._group = e
      }),
      (WTAPI.ConnectedCall = function (e, t) {
        ;(this._name = e), (this._number = t)
      }),
      (WTAPI.ConnectedCall.prototype.getName = function () {
        return this._name
      }),
      (WTAPI.ConnectedCall.prototype.getNumber = function () {
        return this._number
      }),
      (WTAPI.Location = function (e, t, n) {
        ;(this._address = e), (this._lat = t), (this._lng = n)
      }),
      (WTAPI.Location.prototype.getAddress = function () {
        return this._address
      }),
      (WTAPI.Location.prototype.getLat = function () {
        return this._lat
      }),
      (WTAPI.Location.prototype.getLng = function () {
        return this._lng
      }),
      (WTAPI.ProfileData = function (e, t, n, i, r, s, o) {
        ;(this._mail = e),
          (this._authProvider = t),
          (this._url = n),
          (this._gender = i),
          (this._language = r),
          (this._parentHostUrl = s),
          (this._photo = o)
      }),
      (WTAPI.ProfileData.prototype.getMail = function () {
        return this._mail
      }),
      (WTAPI.ProfileData.prototype.getAuthProvider = function () {
        return this._authProvider
      }),
      (WTAPI.ProfileData.prototype.getUrl = function () {
        return this._url
      }),
      (WTAPI.ProfileData.prototype.getGender = function () {
        return this._gender
      }),
      (WTAPI.ProfileData.prototype.getLanguage = function () {
        return this._language
      }),
      (WTAPI.ProfileData.prototype.getParentHostUrl = function () {
        return this._parentHostUrl
      }),
      (WTAPI.ProfileData.prototype.getPhoto = function () {
        return this._photo
      }),
      (WTAPI.Presence = function () {
        ;(this._online = !1),
          (this._show = WTAPI.Presence.NONE),
          (this._deviceShow = WTAPI.Presence.NONE),
          (this._status = null),
          (this._location = null),
          (this._profileData = null),
          (this._until = null),
          (this._connectedCall = null)
      }),
      (WTAPI.Presence.NONE = 0),
      (WTAPI.Presence.AWAY = 1),
      (WTAPI.Presence.DND = 2),
      (WTAPI.Presence.RINGING = 3),
      (WTAPI.Presence.TALKING = 4),
      (WTAPI.Presence.RT = 5),
      (WTAPI.Presence.MUR = 6),
      (WTAPI.Presence.REGISTERED = 7),
      (WTAPI.Presence.prototype.isOnline = function () {
        return this._online
      }),
      (WTAPI.Presence.prototype.isAway = function () {
        return this._show === WTAPI.Presence.AWAY
      }),
      (WTAPI.Presence.prototype.isDND = function () {
        return this._show === WTAPI.Presence.DND
      }),
      (WTAPI.Presence.prototype.isMUR = function () {
        return this._show === WTAPI.Presence.MUR
      }),
      (WTAPI.Presence.prototype.isRinging = function () {
        return this._deviceShow === WTAPI.Presence.RINGING || this._deviceShow === WTAPI.Presence.RT
      }),
      (WTAPI.Presence.prototype.isTalking = function () {
        return this._deviceShow === WTAPI.Presence.TALKING || this._deviceShow === WTAPI.Presence.RT
      }),
      (WTAPI.Presence.prototype.isTalkingAndRinging = function () {
        return this._deviceShow === WTAPI.Presence.RT
      }),
      (WTAPI.Presence.prototype.isRegisteredDevice = function () {
        return this._deviceShow === WTAPI.Presence.REGISTERED
      }),
      (WTAPI.Presence.prototype.isEmpty = function () {
        return (
          this._show === WTAPI.Presence.NONE &&
          this._deviceShow === WTAPI.Presence.NONE &&
          null === this._location &&
          null === this._profileData &&
          null === this._until &&
          null === this._status
        )
      }),
      (WTAPI.Presence.prototype.getStatusIcon = function () {
        switch (this._show) {
          case WTAPI.Presence.AWAY:
            return this._online ? 'away' : 'away-offline'
          case WTAPI.Presence.DND:
            return this._online ? 'dnd' : 'dnd-offline'
          case WTAPI.Presence.MUR:
            return this._online ? 'mur' : 'mur-offline'
          default:
            return this._online ? 'online' : 'offline'
        }
      }),
      (WTAPI.Presence.prototype.getStatusMessage = function () {
        return this._status
      }),
      (WTAPI.Presence.prototype.isStatusMessageAvailable = function () {
        return null !== this._status
      }),
      (WTAPI.Presence.prototype.getStatusUntil = function () {
        return this._until
      }),
      (WTAPI.Presence.prototype.isStatusUntilAvailable = function () {
        return null !== this._until
      }),
      (WTAPI.Presence.prototype.getConnectedCall = function () {
        return this._connectedCall
      }),
      (WTAPI.Presence.prototype.isConnectedCallAvailable = function () {
        return this._connectedCall instanceof WTAPI.ConnectedCall
      }),
      (WTAPI.Presence.prototype.getLocation = function () {
        return this._location
      }),
      (WTAPI.Presence.prototype.getProfileData = function () {
        return this._profileData
      }),
      (WTAPI.Presence.prototype.isLocationAvailable = function () {
        return this._location instanceof WTAPI.Location
      }),
      (WTAPI.Presence.Builder = function () {
        var e = new WTAPI.Presence()
        this._getPresence = () => e
      }),
      (WTAPI.Presence.Builder.prototype.setOnline = function () {
        return (this._getPresence()._online = !0), this
      }),
      (WTAPI.Presence.Builder.prototype.setAway = function () {
        return (this._getPresence()._show = WTAPI.Presence.AWAY), this
      }),
      (WTAPI.Presence.Builder.prototype.setDND = function () {
        return (this._getPresence()._show = WTAPI.Presence.DND), this
      }),
      (WTAPI.Presence.Builder.prototype.setMUR = function () {
        return (this._getPresence()._show = WTAPI.Presence.MUR), this
      }),
      (WTAPI.Presence.Builder.prototype.setRinging = function () {
        return (this._getPresence()._deviceShow = WTAPI.Presence.RINGING), this
      }),
      (WTAPI.Presence.Builder.prototype.setTalking = function () {
        return (this._getPresence()._deviceShow = WTAPI.Presence.TALKING), this
      }),
      (WTAPI.Presence.Builder.prototype.setRingingAndTalking = function () {
        return (this._getPresence()._deviceShow = WTAPI.Presence.RT), this
      }),
      (WTAPI.Presence.Builder.prototype.setRegisteredDevice = function () {
        return (this._getPresence()._deviceShow = WTAPI.Presence.REGISTERED), this
      }),
      (WTAPI.Presence.Builder.prototype.setStatusMessage = function (e) {
        return (this._getPresence()._status = e), this
      }),
      (WTAPI.Presence.Builder.prototype.setStatusUntil = function (e) {
        return (this._getPresence()._until = e), this
      }),
      (WTAPI.Presence.Builder.prototype.setLocation = function (e) {
        if (!(e instanceof WTAPI.Location))
          throw new Error('Invalid location argument, it should be a WTAPI.Location instance')
        return (this._getPresence()._location = e), this
      }),
      (WTAPI.Presence.Builder.prototype.setConnectedCall = function (e) {
        if (!(e instanceof WTAPI.ConnectedCall))
          throw new Error('Invalid call argument, it should be a WTAPI.ConnectedCall instance')
        return (this._getPresence()._connectedCall = e), this
      }),
      (WTAPI.Presence.Builder.prototype.setProfileData = function (e) {
        if (!(e instanceof WTAPI.ProfileData))
          throw new Error('Invalid profile data argument, it should be a WTAPI.ProfileData instance')
        return (this._getPresence()._profileData = e), this
      }),
      (WTAPI.Presence.Builder.prototype.build = function () {
        return this._getPresence()
      }),
      (WTAPI.Message = function () {
        ;(this._id = ''), (this._body = '')
      }),
      (WTAPI.Message.prototype.getId = function () {
        return this._id
      }),
      (WTAPI.Message.prototype.getBody = function () {
        return this._body
      }),
      (WTAPI.Message.Builder = () => {
        var e = new WTAPI.Message()
        return {
          withId: function (t) {
            return (e._id = t), this
          },
          withAutoGeneratedId: function () {
            return (
              (e._id =
                this._rand() +
                this._rand() +
                '-' +
                this._rand() +
                '-' +
                this._rand() +
                '-' +
                this._rand() +
                '-' +
                this._rand() +
                this._rand() +
                this._rand()),
              this
            )
          },
          withBody: function (t) {
            return (e._body = t), this
          },
          build: () => e,
          _rand: () =>
            Math.floor(65536 * (1 + Math.random()))
              .toString(16)
              .substring(1),
        }
      })
    var jsonpID = 0,
      document$1 = window.document,
      key,
      name,
      scriptTypeRE = /^(?:text|application)\/javascript/i,
      xmlTypeRE = /^(?:text|application)\/xml/i,
      jsonType = 'application/json; charset=utf-8',
      htmlType = 'text/html',
      blankRE = /^\s*$/,
      ajax = e => {
        var t = extend({}, e || {})
        for (key in ajax.settings) void 0 === t[key] && (t[key] = ajax.settings[key])
        ;(t.url = t.protocol + '//' + t.host + t.url),
          ajaxStart(t),
          t.crossDomain ||
            (t.crossDomain =
              /^([\w-]+:)?\/\/([^/]+)/.test(t.url) && RegExp.$2 != window.location.host)
        var n = t.dataType,
          i = /=\?/.test(t.url)
        if ('jsonp' == n || i) return i || (t.url = appendQuery(t.url, 'callback=?')), ajax.JSONP(t)
        t.url || (t.url = window.location.toString()), serializeData(t)
        var r,
          s = t.accepts[n],
          o = {},
          a = /^([\w-]+:)\/\//.test(t.url) ? RegExp.$1 : window.location.protocol,
          h = ajax.settings.xhr()
        if (t.xhrFields) for (const e in t.xhrFields) h[e] = t.xhrFields[e]
        t.crossDomain || (o['X-Requested-With'] = 'XMLHttpRequest'),
          s &&
            ((o.Accept = s),
            s.indexOf(',') > -1 && (s = s.split(',', 2)[0]),
            h.overrideMimeType && h.overrideMimeType(s)),
          (t.contentType || (t.data && 'GET' != t.type.toUpperCase())) &&
            (o['Content-Type'] = t.contentType || 'application/x-www-form-urlencoded'),
          (t.headers = extend(o, t.headers || {})),
          (h.onreadystatechange = () => {
            if (4 == h.readyState) {
              clearTimeout(r)
              var e,
                i = !1
              if (
                (h.status >= 200 && h.status < 300) ||
                304 == h.status ||
                (0 == h.status && 'file:' == a)
              ) {
                ;(n = n || mimeToDataType(h.getResponseHeader('content-type'))), (e = h.responseText)
                try {
                  'script' == n
                    ? (0, eval)(e)
                    : 'text' == n
                      ? (e = h.responseText)
                      : 'xml' == n
                        ? (e = h.responseXML)
                        : ('json' != n && 'application/json' != response) ||
                          (e = blankRE.test(e) ? null : JSON.parse(e))
                } catch (e) {
                  i = e
                }
                i ? ajaxError(i, 'parsererror', h, t) : ajaxSuccess(e, h, t)
              } else ajaxError(null, 'error', h, t)
            }
          })
        var u = !('async' in t) || t.async
        for (name in (h.open(t.type, t.url, u), t.headers)) h.setRequestHeader(name, t.headers[name])
        return !1 === ajaxBeforeSend(h, t)
          ? (h.abort(), !1)
          : (t.timeout > 0 &&
              (r = setTimeout(() => {
                ;(h.onreadystatechange = empty), h.abort(), ajaxError(null, 'timeout', h, t)
              }, t.timeout)),
            h.send(t.data ? t.data : null),
            h)
      }
    function triggerAndReturn(e, t, n) {
      return !0
    }
    function triggerGlobal(e, t, n, i) {
      if (e.global) return triggerAndReturn()
    }
    function ajaxStart(e) {
      e.global && 0 == ajax.active++ && triggerGlobal(e)
    }
    function ajaxStop(e) {
      e.global && !--ajax.active && triggerGlobal(e)
    }
    function ajaxBeforeSend(e, t) {
      var n = t.context
      if (!1 === t.beforeSend.call(n, e, t) || !1 === triggerGlobal(t)) return !1
      triggerGlobal(t)
    }
    function ajaxSuccess(e, t, n) {
      var i = n.context,
        r = 'success'
      n.success.call(i, e, r, t), triggerGlobal(n), ajaxComplete(r, t, n)
    }
    function ajaxError(e, t, n, i) {
      var r = i.context
      i.error.call(r, n, t, e), triggerGlobal(i), ajaxComplete(t, n, i)
    }
    function ajaxComplete(e, t, n) {
      var i = n.context
      n.complete.call(i, t, e), triggerGlobal(n), ajaxStop(n)
    }
    function empty() {}
    function mimeToDataType(e) {
      return (
        (e &&
          (e == htmlType
            ? 'html'
            : e == jsonType
              ? 'json'
              : scriptTypeRE.test(e)
                ? 'script'
                : xmlTypeRE.test(e) && 'xml')) ||
        'text'
      )
    }
    function appendQuery(e, t) {
      return (e + '&' + t).replace(/[&?]{1,2}/, '?')
    }
    function serializeData(e) {
      'object' === type(e.data) && (e.data = param(e.data)),
        !e.data || (e.type && 'GET' != e.type.toUpperCase()) || (e.url = appendQuery(e.url, e.data))
    }
    ;(ajax.active = 0),
      (ajax.JSONP = e => {
        if (!('type' in e)) return ajax(e)
        var t,
          n = 'jsonp' + ++jsonpID,
          i = document$1.createElement('script'),
          r = {
            abort: () => {
              n in window && (window[n] = empty), ajaxComplete('abort', r, e)
            },
          },
          s = document$1.getElementsByTagName('head')[0] || document$1.documentElement
        return (
          e.error &&
            (i.onerror = () => {
              r.abort(), e.error()
            }),
          (window[n] = i => {
            clearTimeout(t), delete window[n], ajaxSuccess(i, r, e)
          }),
          serializeData(e),
          (i.src = e.url.replace(/=\?/, '=' + n)),
          s.insertBefore(i, s.firstChild),
          e.timeout > 0 &&
            (t = setTimeout(() => {
              r.abort(), ajaxComplete('timeout', r, e)
            }, e.timeout)),
          r
        )
      }),
      (ajax.settings = {
        type: 'GET',
        beforeSend: empty,
        success: empty,
        error: empty,
        complete: empty,
        context: null,
        global: !0,
        xhr: () => new window.XMLHttpRequest(),
        accepts: {
          script: 'text/javascript, application/javascript',
          json: jsonType,
          xml: 'application/xml, text/xml',
          html: htmlType,
          text: 'text/plain',
        },
        crossDomain: !0,
        xhrFields: {
          withCredentials: !1,
        },
        timeout: 0,
        headers: {},
      }),
      (ajax.get = (e, t) =>
        ajax({
          url: e,
          success: t,
        })),
      (ajax.post = (e, t, n, i) => (
        'function' === type(t) && ((i = i || n), (n = t), (t = null)),
        ajax({
          type: 'POST',
          url: e,
          data: t,
          success: n,
          dataType: i,
        })
      )),
      (ajax.getJSON = (e, t) =>
        ajax({
          url: e,
          success: t,
          dataType: 'json',
        })),
      (ajax.setAuthorizationToken = function (e) {
        this.settings.headers.Authorization = 'Bearer ' + e
      })
    var escape$1 = encodeURIComponent
    function serialize(e, t, n, i) {
      var r = 'array' === type(t)
      for (var s in t) {
        var o = t[s]
        i && (s = n ? i : i + '[' + (r ? '' : s) + ']'),
          !i && r
            ? e.add(o.name, o.value)
            : (n ? 'array' === type(o) : 'object' === type(o))
              ? serialize(e, o, n, s)
              : e.add(s, o)
      }
    }
    function param(e, t) {
      var n = []
      return (
        (n.add = function (e, t) {
          this.push(escape$1(e) + '=' + escape$1(t))
        }),
        serialize(n, e, t),
        n.join('&').replace('%20', '+')
      )
    }
    function type(e) {
      return typeof e
    }
    function extend(e) {
      return (
        Array.prototype.slice.call(arguments, 1).forEach(t => {
          for (key in t) void 0 !== t[key] && (e[key] = t[key])
        }),
        e
      )
    }
    var NS_ROSTER = 'jabber:iq:roster'
    function RosterPlugin(e) {
      ;(this._users = {}),
        (this._wtapi = e),
        this._wtapi.addListener('connected', this._onConnected, this),
        this._wtapi.addListener('disconnected', this._onDisconnected, this),
        (this.roster = []),
        WTAPI.Observable.call(this)
    }
    ;(RosterPlugin.prototype = Object.create(WTAPI.Observable.prototype)),
      (RosterPlugin.prototype.getUser = function (e) {
        return e in this._users ? this._users[e] : null
      }),
      (RosterPlugin.prototype.getUserByExtension = function (e) {
        if (this._users)
          for (var t in this._users) if (this._users[t].getExtension() == e) return this._users[t]
        return null
      }),
      (RosterPlugin.prototype.getRoster = function (e) {
        var t = arguments[1] || this,
          n = this._createGetRosterPacket(),
          i = this._createGetRosterHandler(e, t)
        this._wtapi.getConnection().sendIQ(n, i)
      }),
      (RosterPlugin.prototype.createUser = function (e, t) {
        return this._addUser(new WTAPI.User(e, t))
      }),
      (RosterPlugin.prototype.createUserByExtension = function (e) {
        var t = e + '@wildix'
        return (
          this._wtapi.isNewServer() && (t = e + '@' + this._wtapi.server),
          this._addUser(new WTAPI.User(t, null))
        )
      }),
      (RosterPlugin.prototype._addUser = function (e) {
        if (e.getJid() in this._users) throw new Error('User ' + e.getJid() + ' already exist')
        return (this._users[e.getJid()] = e), e
      }),
      (RosterPlugin.prototype._onConnected = () => {}),
      (RosterPlugin.prototype._onDisconnected = () => {}),
      (RosterPlugin.prototype._createGetRosterPacket = () => {
        var e = new JSJaCIQ().setType('get')
        return e.setQuery(NS_ROSTER), e
      }),
      (RosterPlugin.prototype._createGetRosterHandler = function (e, t) {
        return {
          result_handler: i => {
            'function' == typeof e && e.call(t, this._parseGetRosterResponse(i))
          },
          error_handler: () => {
            'function' == typeof e && e.call(t, [])
          },
        }
      }),
      (RosterPlugin.prototype._parseGetRosterResponse = function (e) {
        for (var t = e.getNode().getElementsByTagName('item'), n = [], i = 0; i < t.length; i++) {
          var r,
            s = t.item(i),
            o = s.getAttribute('jid'),
            a = s.getAttribute('name'),
            h = s.getElementsByTagName('group')
          h.length > 0 && h.item(0).firstChild && (r = h.item(0).firstChild.nodeValue)
          var u = this.getUser(o)
          null === u && (u = this.createUser(o, a)), u.setGroup(r), u.setName(a), n.push(u)
        }
        return n
      })
    const NS_AMI = 'urn:wildix:ami',
      NS_AMI_DEVICES = 'urn:wildix:devices'
    function TelephonyPlugin(e) {
      ;(this._calls = []),
        (this._devices = []),
        (this._wtapi = e),
        this._wtapi.registerHandler('message', this._handleMessage, this, 10),
        this._wtapi.addListener('connected', this._onConnected, this),
        this._wtapi.addListener('disconnected', this._onDisconnected, this),
        WTAPI.Observable.call(this)
    }
    function Device(e, t) {
      var n,
        i = t
      ;((n = t.match(/^Wildix (WP\d+) ((\d+\.)+\d+).*?$/i)) ||
        (n = t.match(/^Wildix (W-AIR) ((\d+\.)+\d+).*?$/i)) ||
        (n = t.match(/^Wildix (Zero Distance) ((\d+\.)+\d+).*?$/i))) &&
        (i = n[1]),
        (this.getId = () => e),
        (this.getName = () => i),
        (this.getUserAgent = () => t)
    }
    function Call(e, t, n, i, r, s, o, a, h) {
      ;(this._calleeNumber = t),
        (this._calleeName = n),
        (this._duration = parseInt(i)),
        (this._durationTime = Math.round(new Date().getTime() / 1e3)),
        (this._record = r),
        (this._state = s),
        (this._channel = e),
        (this._destination = a),
        (this._type = h),
        (this._hangupCause = null),
        (this._hangupCauseText = null),
        (this.getDirection = () => o)
    }
    ;(TelephonyPlugin.prototype = Object.create(WTAPI.Observable.prototype)),
      (TelephonyPlugin.prototype.call = function (e, t, n) {
        var i = arguments[3] || this,
          r = this._createOriginateUsingReferPacket(e, t),
          s = this._proxyIqCallback(n, i)
        this._wtapi.getConnection().sendIQ(r, s)
      }),
      (TelephonyPlugin.prototype.callToMobility = function (e, t, n, i) {
        var r = arguments[4] || this,
          s = this._createOriginateUsingMobilityPacket(e, t, n),
          o = this._proxyIqCallback(i, r)
        this._wtapi.getConnection().sendIQ(s, o)
      }),
      (TelephonyPlugin.prototype.callToAllDevices = function (e, t) {
        var n = arguments[2] || this,
          i = this._createOriginateUsingInvitePacket(e),
          r = this._proxyIqCallback(t, n)
        this._wtapi.getConnection().sendIQ(i, r)
      }),
      (TelephonyPlugin.prototype.answer = function (e, t, n) {
        var i = arguments[2] || this,
          r = this._createAnswerCallPacket(t, e),
          s = this._proxyIqCallback(n, i)
        this._wtapi.getConnection().sendIQ(r, s)
      }),
      (TelephonyPlugin.prototype.hangup = function (e, t) {
        var n = arguments[2] || this,
          i = this._createHangUpCallPacket(e),
          r = this._proxyIqCallback(t, n)
        this._wtapi.getConnection().sendIQ(i, r)
      }),
      (TelephonyPlugin.prototype.hold = function (e, t) {
        var n = arguments[2] || this,
          i = this._createHoldPacket(e),
          r = this._proxyIqCallback(t, n)
        this._wtapi.getConnection().sendIQ(i, r)
      }),
      (TelephonyPlugin.prototype.resume = function (e, t) {
        var n = arguments[2] || this,
          i = this._createResumePacket(e),
          r = this._proxyIqCallback(t, n)
        this._wtapi.getConnection().sendIQ(i, r)
      }),
      (TelephonyPlugin.prototype.forward = function (e, t, n) {
        var i = arguments[3] || this,
          r = this._createForwardPacket(e, t),
          s = this._proxyIqCallback(n, i)
        this._wtapi.getConnection().sendIQ(r, s)
      }),
      (TelephonyPlugin.prototype.bridge = function (e, t, n) {
        var i = arguments[3] || this,
          r = this._createBridgePacket(e, t),
          s = this._proxyIqCallback(n, i)
        this._wtapi.getConnection().sendIQ(r, s)
      }),
      (TelephonyPlugin.prototype.startRecord = function (e, t) {
        var n = arguments[2] || this,
          i = this._createStartRecordPacket(e),
          r = this._proxyIqCallback(t, n)
        this._wtapi.getConnection().sendIQ(i, r)
      }),
      (TelephonyPlugin.prototype.stopRecord = function (e, t) {
        var n = arguments[2] || this,
          i = this._createStopRecordPacket(e),
          r = this._proxyIqCallback(t, n)
        this._wtapi.getConnection().sendIQ(i, r)
      }),
      (TelephonyPlugin.prototype.getActiveCalls = function () {
        return this._calls.slice(0)
      }),
      (TelephonyPlugin.prototype.getRegisteredDevices = function () {
        return this._devices.slice(0)
      }),
      (TelephonyPlugin.prototype._onConnected = () => {}),
      (TelephonyPlugin.prototype._onDisconnected = function () {
        ;(this._devices = []), this._fire('devices_changed', this._devices)
        for (var e = 0; e < this._calls.length; e++) this._fire('call_terminated', this._calls[e])
        this._calls = []
      }),
      (TelephonyPlugin.prototype._handleMessage = function (e) {
        return !!this._handleCallsStateMessage(e) || !!this._handleDevicesStateMessage(e) || void 0
      }),
      (TelephonyPlugin.prototype._handleCallsStateMessage = function (e) {
        var t = e.getChild('event', NS_AMI)
        if (t) {
          switch (t.getAttribute('type')) {
            case 'new':
              this._handleCallsAdded(this._parseCallItems(t))
              break
            case 'update':
              this._handleCallsUpdated(this._parseCallItems(t))
              break
            case 'remove':
              this._handleCallsRemoved(this._parseCallItems(t))
              break
            case 'state':
              this._handleCallsState(this._parseCallItems(t))
          }
          return !0
        }
      }),
      (TelephonyPlugin.prototype._handleCallsAdded = function (e) {
        for (var t = 0; t < e.length; t++) {
          for (var n = Call.fromObject(e[t]), i = !1, r = 0; r < this._calls.length; r++)
            if (this._calls[r].getChannel() == n.getChannel()) {
              i = !0
              break
            }
          i || (this._calls.push(n), this._fire('call_added', n))
        }
      }),
      (TelephonyPlugin.prototype._handleCallsUpdated = function (e) {
        for (var t = 0; t < e.length; t++)
          for (var n = e[t].channel, i = 0; i < this._calls.length; i++) {
            var r = this._calls[i]
            r.getChannel() === n && (r.updateFromObject(e[t]), this._fire('call_updated', r))
          }
      }),
      (TelephonyPlugin.prototype._handleCallsRemoved = function (e) {
        for (var t = 0; t < e.length; t++) {
          for (var n = e[t].channel, i = [], r = 0; r < this._calls.length; r++) {
            var s = this._calls[r]
            s.getChannel() !== n
              ? i.push(s)
              : ((s._hangupCause = e[t].hangupCause),
                (s._hangupCauseText = e[t].hangupCauseText),
                this._fire('call_terminated', s))
          }
          this._calls = i
        }
      }),
      (TelephonyPlugin.prototype._handleCallsState = function (e) {
        return this._handleCallsAdded(e)
      }),
      (TelephonyPlugin.prototype._handleDevicesStateMessage = function (e) {
        var t = e.getChild('event', NS_AMI_DEVICES)
        if (t) {
          this._devices = []
          for (var n = t.getElementsByTagName('item'), i = 0; i < n.length; i++) {
            var r = Device.fromObject(this._parseDeviceItem(n.item(i)))
            this._devices.push(r)
          }
          return this._fire('devices_changed', this._devices), !0
        }
      }),
      (TelephonyPlugin.prototype._createOriginateUsingReferPacket = (e, t) => {
        var n = new JSJaCIQ()
        n.setType('set')
        var i = n.setQuery('urn:wildix:ami'),
          r = n.getDoc().createElement('originate')
        return (
          r.setAttribute('to', t),
          r.setAttribute('device', e.getId()),
          r.setAttribute('type', 'refer'),
          i.appendChild(r),
          n
        )
      }),
      (TelephonyPlugin.prototype._createOriginateUsingInvitePacket = e => {
        var t = new JSJaCIQ()
        t.setType('set')
        var n = t.setQuery('urn:wildix:ami'),
          i = t.getDoc().createElement('originate')
        return i.setAttribute('to', e), n.appendChild(i), t
      }),
      (TelephonyPlugin.prototype._createOriginateUsingMobilityPacket = (e, t, n) => {
        n || (n = 'en')
        var i = new JSJaCIQ()
        i.setType('set')
        var r = i.setQuery('urn:wildix:ami'),
          s = i.getDoc().createElement('originate')
        return (
          s.setAttribute('to', t),
          s.setAttribute('type', 'mobility'),
          s.setAttribute('mobility', e),
          s.setAttribute('lang', n),
          r.appendChild(s),
          i
        )
      }),
      (TelephonyPlugin.prototype._createAnswerCallPacket = (e, t) => {
        var n = new JSJaCIQ().setType('set'),
          i = n.setQuery(NS_AMI),
          r = n.getDoc().createElement('answer')
        return (
          r.setAttribute('channel', e.getChannel()),
          r.setAttribute('device', t.getId()),
          i.appendChild(r),
          n
        )
      }),
      (TelephonyPlugin.prototype._createHangUpCallPacket = e => {
        var t = new JSJaCIQ().setType('set'),
          n = t.setQuery(NS_AMI),
          i = t.getDoc().createElement('hangup')
        return i.setAttribute('channel', e.getChannel()), n.appendChild(i), t
      }),
      (TelephonyPlugin.prototype._createDeclineCallPacket = e => {
        var t = new JSJaCIQ().setType('set'),
          n = t.setQuery(NS_AMI),
          i = t.getDoc().createElement('hangup')
        return i.setAttribute('channel', e.getChannel()), n.appendChild(i), t
      }),
      (TelephonyPlugin.prototype._createHoldPacket = e => {
        var t = new JSJaCIQ().setType('set'),
          n = t.setQuery(NS_AMI),
          i = t.getDoc().createElement('hold')
        return i.setAttribute('channel', e.getChannel()), n.appendChild(i), t
      }),
      (TelephonyPlugin.prototype._createResumePacket = e => {
        var t = new JSJaCIQ().setType('set'),
          n = t.setQuery(NS_AMI),
          i = t.getDoc().createElement('unhold')
        return i.setAttribute('channel', e.getChannel()), n.appendChild(i), t
      }),
      (TelephonyPlugin.prototype._createStartRecordPacket = e => {
        var t = new JSJaCIQ().setType('set'),
          n = t.setQuery(NS_AMI),
          i = t.getDoc().createElement('record-start')
        return i.setAttribute('channel', e.getChannel()), n.appendChild(i), t
      }),
      (TelephonyPlugin.prototype._createStopRecordPacket = e => {
        var t = new JSJaCIQ().setType('set'),
          n = t.setQuery(NS_AMI),
          i = t.getDoc().createElement('record-stop')
        return i.setAttribute('channel', e.getChannel()), n.appendChild(i), t
      }),
      (TelephonyPlugin.prototype._createForwardPacket = (e, t) => {
        var n = new JSJaCIQ().setType('set'),
          i = n.setQuery(NS_AMI),
          r = n.getDoc().createElement('forward')
        return r.setAttribute('channel', e.getChannel()), r.setAttribute('to', t), i.appendChild(r), n
      }),
      (TelephonyPlugin.prototype._createBridgePacket = (e, t) => {
        var n = new JSJaCIQ().setType('set'),
          i = n.setQuery(NS_AMI).appendChild(
            n.buildNode('bridge', {
              xmlns: NS_AMI,
            })
          )
        return (
          i.appendChild(
            n.buildNode('call', {
              xmlns: NS_AMI,
              channel: e.getChannel(),
            })
          ),
          i.appendChild(
            n.buildNode('call', {
              xmlns: NS_AMI,
              channel: t.getChannel(),
            })
          ),
          n
        )
      }),
      (TelephonyPlugin.prototype._parseCallItems = function (e) {
        for (var t = e.getElementsByTagName('call'), n = [], i = 0; i < t.length; i++)
          n.push(this._parseCallItem(t.item(i)))
        return n
      }),
      (TelephonyPlugin.prototype._parseCallItem = e => {
        var t = e.querySelector('hangup-cause'),
          n = null,
          i = null
        return (
          t && ((n = t.getAttribute('cause')), (i = t.getAttribute('cause-txt'))),
          {
            channel: e.getAttribute('channel'),
            calleeNumber: e.getAttribute('connected_line_num'),
            calleeName: e.getAttribute('connected_line_name'),
            duration: e.getAttribute('duration'),
            record: e.getAttribute('record'),
            state: e.getAttribute('state'),
            direction: e.getAttribute('direction'),
            destination: e.getAttribute('destination'),
            type: e.getAttribute('type'),
            hangupCause: n,
            hangupCauseText: i,
          }
        )
      }),
      (TelephonyPlugin.prototype._parseDeviceItem = e => ({
        id: e.getAttribute('id'),
        name: e.getAttribute('name'),
      })),
      (TelephonyPlugin.prototype._proxyIqCallback = (e, t) => ({
        error_handler: n => {
          var i = n.getNode().getElementsByTagName('error'),
            r = 'unknown'
          if (i.length > 0) {
            var s = i[0].firstChild
            s && (r = s.tagName)
          }
          e.call(t, r)
        },
        result_handler: () => {
          e.call(t, null)
        },
      })),
      (Device.fromObject = e => new Device(e.id, e.name)),
      (Call.fromObject = e =>
        new Call(
          e.channel,
          e.calleeNumber,
          e.calleeName,
          e.duration,
          e.record,
          e.state,
          e.direction,
          e.destination,
          e.type
        )),
      (Call.prototype.updateFromObject = function (e) {
        ;(this._calleeNumber = e.calleeNumber),
          (this._calleeName = e.calleeName),
          (this._duration = parseInt(e.duration)),
          (this._durationTime = Math.round(new Date().getTime() / 1e3)),
          (this._record = e.record),
          (this._state = e.state),
          (this._destination = e.destination),
          (this._type = e.type),
          (this._hangupCause = e.hangupCause),
          (this._hangupCauseText = e.hangupCauseText)
      }),
      (Call.prototype.getChannel = function () {
        return this._channel
      }),
      (Call.prototype.getDestinationChannel = function () {
        return this._destination
      }),
      (Call.prototype.getType = function () {
        return this._type
      }),
      (Call.prototype.getDuration = function () {
        var e = Math.round(new Date().getTime() / 1e3) - this._durationTime
        return this._duration + e
      }),
      (Call.prototype.getFormattedDuration = function () {
        var e = this.getDuration()
        if (isNaN(e)) return '00:00'
        var t = parseInt(e / 3600) % 24,
          n = parseInt(e / 60) % 60,
          i = ''
        return (
          t > 0 && (i += (t < 10 ? '0' + t : t) + ':'),
          (i += (n < 10 ? '0' + n : n) + ':' + ((e %= 60) < 10 ? '0' + e : e))
        )
      }),
      (Call.prototype.getCalleeName = function () {
        return this._calleeName
      }),
      (Call.prototype.getCalleeNumber = function () {
        return this._calleeNumber
      }),
      (Call.prototype.getFormattedCalleeName = function () {
        return this._calleeName.length > 0
          ? this._calleeName + '(' + this._calleeNumber + ')'
          : this._calleeNumber
      }),
      (Call.prototype.getState = function () {
        return this._state
      }),
      (Call.prototype.getFormattedState = function () {
        switch (this._state) {
          case 'ring':
            return 'Ringing'
          case 'hold':
            return 'Paused'
          case 'up':
            return 'Connected'
        }
      }),
      (Call.prototype.isIncoming = function () {
        return 'incoming' == this.getDirection()
      }),
      (Call.prototype.isOutgoing = function () {
        return 'outgoing' == this.getDirection()
      }),
      (Call.prototype.isRecorded = function () {
        return 'on' == this._record
      }),
      (Call.prototype.getRecordedFiles = function (e, t) {
        ;(e = e || (() => {})), (t = t || (() => {}))
        var n = this.getChannel()
        this.isIncoming() && (n = this.getDestinationChannel()),
          n &&
            '' != n &&
            WTAPI.ajax({
              url: '/api/v1/Calls/' + encodeURIComponent(n) + '/Recordings/',
              type: 'GET',
              success: function (t, n, i) {
                'result' == t.type && t.result && t.result.records && e(this, t.result.records)
              }.bind(this),
              error: function (e, n, i) {
                if (404 != e.status) {
                  if ((e.statusText, e && e.responseText))
                    try {
                      var r = JSON.parse(e.responseText)
                      r.type && 'error' == r.type && t(this, r.reason)
                    } catch (e) {
                      t(this, e.message)
                    }
                } else t(this, e.statusText)
              }.bind(this),
            })
      }),
      (Call.prototype.isRinging = function () {
        return 'ring' == this._state
      }),
      (Call.prototype.isOnHold = function () {
        return 'hold' == this._state
      }),
      (Call.prototype.getHangupCause = function () {
        return this._hangupCause
      }),
      (Call.prototype.getHangupCauseText = function () {
        return this._hangupCauseText
      })
    var NS_QUEUES = 'urn:wildix:queues'
    function QueuesPlugin(e) {
      ;(this._queues = []),
        (this._subscribed = !1),
        (this._wtapi = e),
        this._wtapi.registerHandler('message', this._handleMessage, this, 10),
        this._wtapi.addListener('connected', this._onConnected, this),
        this._wtapi.addListener('disconnected', this._onDisconnected, this),
        (this._messageHandlers = [
          this._handleMessageQueueAdd,
          this._handleMessageQueueRemove, 
          this._handleMessageMemberAdd,
          this._handleMessageMemberUpdate,
          this._handleMessageMemberRemove,
          this._handleMessageMemberCallAdd,
          this._handleMessageMemberCallRemove,
          this._handleMessageUserJoin,
          this._handleMessageUserLeave,
        ]),
        WTAPI.Observable.call(this)
    }
    function Queue(e, t) {
      ;(this._members = []), (this._users = []), (this.getId = () => e), (this.getName = () => t)
    }
    function QueueMember(e, t, n, i, r, s, o, a) {
      ;(this._location = e),
        (this._extension = t),
        (this._name = n),
        (this._membership = i),
        (this._penalty = r),
        (this._status = s),
        (this._pause = o),
        (this._sleep = parseInt(a)),
        (this._sleepSetTime = Math.round(new Date().getTime() / 1e3)),
        (this._calls = [])
    }
    function QueueUser(e, t, n, i) {
      ;(this._channel = e),
        (this._num = t),
        (this._name = n),
        (this._duration = parseInt(i)),
        (this._durationSetTime = Math.round(new Date().getTime() / 1e3))
    }
    function QueueCall(e, t, n, i, r) {
      ;(this._channel = e),
        (this._destinationChannel = t),
        (this._calleeNumber = n),
        (this._calleeName = i),
        (this._duration = parseInt(r)),
        (this._durationSetTime = Math.round(new Date().getTime() / 1e3))
    }
    function ChatPlugin(e) {
      ;(this._wtapi = e),
        this._wtapi.registerHandler('message', this._handleMessage, this, 100),
        (this._roster = this._wtapi.roster),
        WTAPI.Observable.call(this)
    }
    ;(QueuesPlugin.prototype = Object.create(WTAPI.Observable.prototype)),
      (QueuesPlugin.prototype.subscribe = function (e) {
        if (!this._subscribed) {
          this._subscribed = !0
          var t = arguments[1] || this,
            i = this._createSubscribePacket(),
            r = {
              result_handler: i => {
                this._handleSubscribeResponse(i, e, t)
              },
            }
          this._wtapi.getConnection().sendIQ(i, r)
        }
      }),
      (QueuesPlugin.prototype.isSubscribed = function () {
        return this._subscribed
      }),
      (QueuesPlugin.prototype.unsubscribe = function (e) {
        var t = arguments[1] || this,
          i = this._createUnsubscribePacket(),
          r = {
            result_handler: i => {
              this._handleUnsubscribeResponse(i, e, t)
            },
          }
        this._wtapi.getConnection().sendIQ(i, r)
      }),
      (QueuesPlugin.prototype.add = function (e, t, n) {
        var i = arguments[3] || this,
          r = this._createAddPacket(e, t),
          s = this._createIqHandler(n, i)
        this._wtapi.getConnection().sendIQ(r, s)
      }),
      (QueuesPlugin.prototype.remove = function (e, t, n) {
        var i = arguments[3] || this,
          r = this._createRemovePacket(e, t),
          s = this._createIqHandler(n, i)
        this._wtapi.getConnection().sendIQ(r, s)
      }),
      (QueuesPlugin.prototype.pause = function (e, t, n) {
        var i = arguments[3] || this,
          r = this._createPausePacket(e, t),
          s = this._createIqHandler(n, i)
        this._wtapi.getConnection().sendIQ(r, s)
      }),
      (QueuesPlugin.prototype.resume = function (e, t, n) {
        var i = arguments[3] || this,
          r = this._createResumePacket(e, t),
          s = this._createIqHandler(n, i)
        this._wtapi.getConnection().sendIQ(r, s)
      }),
      (QueuesPlugin.prototype.getQueues = function () {
        return this._queues
      }),
      (QueuesPlugin.prototype.getQueue = function (e) {
        for (var t = 0; t < this._queues.length; t++)
          if (this._queues[t].getId() == e) return this._queues[t]
        return null
      }),
      (QueuesPlugin.prototype._onConnected = function () {
        this._subscribed && ((this._subscribed = !1), this.subscribe())
      }),
      (QueuesPlugin.prototype._onDisconnected = function () {
        for (var e = 0; e < this._queues.length; e++) this._fire('queue_removed', this._queues[e])
        this._queues = []
      }),
      (QueuesPlugin.prototype._handleMessage = function (e) {
        var t = e.getChild('event', NS_QUEUES)
        if (t)
          for (var n = t.getAttribute('operation'), i = 0; i < this._messageHandlers.length; i++)
            if (this._messageHandlers[i].call(this, t, n)) return !0
        return !1
      }),
      (QueuesPlugin.prototype._handleMessageQueueAdd = function (e, t) {
        if ('add' != t) return !1
        var n = e.getElementsByTagName('queue')
        if (0 == n.length) return !1
        for (var i = 0; i < n.length; i++) {
          var r = n.item(i),
            s = r.getAttribute('id'),
            o = r.getAttribute('name'),
            a = this.getQueue(s)
          null === a && ((a = new Queue(s, o)), this._queues.push(a), this._fire('queue_added', a))
        }
        return !0
      }),
      (QueuesPlugin.prototype._handleMessageQueueRemove = function (e, t) {
        if ('remove' != t) return !1
        var n = e.getElementsByTagName('queue')
        if (0 == n.length) return !1
        for (var i = 0; i < n.length; i++) {
          var r = n.item(i).getAttribute('id'),
            s = this.getQueue(r)
          if (s)
            for (var o in this._queues)
              if (this._queues[o] == s) {
                this._queues.splice(o, 1), this._fire('queue_removed', s)
                break
              }
        }
        return !0
      }),
      (QueuesPlugin.prototype._handleMessageMemberAdd = function (e, t) {
        if ('add' != t) return !1
        var n = e.getElementsByTagName('member')
        if (0 == n.length) return !1
        for (var i = 0; i < n.length; i++) {
          var r = n.item(i),
            s = this._parseMemberItem(r),
            o = this.getQueue(s.queue)
          if (o) {
            var a = o.getMember(s.location)
            a || ((a = QueueMember.fromObject(s)), o._addMember(a), this._fire('member_added', o, a))
          }
        }
        return !0
      }),
      (QueuesPlugin.prototype._handleMessageMemberUpdate = function (e, t) {
        if ('update' != t) return !1
        var n = e.getElementsByTagName('member')
        if (0 == n.length) return !1
        for (var i = 0; i < n.length; i++) {
          var r = n.item(i),
            s = this._parseMemberItem(r),
            o = this.getQueue(s.queue)
          if (o) {
            var a = o.getMember(s.location)
            a && (a._updateFromObject(s), this._fire('member_updated', o, a))
          }
        }
        return !0
      }),
      (QueuesPlugin.prototype._handleMessageMemberRemove = function (e, t) {
        if ('remove' != t) return !1
        var n = e.getElementsByTagName('member')
        if (0 == n.length) return !1
        for (var i = 0; i < n.length; i++) {
          var r = n.item(i),
            s = this._parseMemberItem(r),
            o = this.getQueue(s.queue)
          if (o) {
            var a = o.getMember(s.location)
            a && (o._removeMember(a), this._fire('member_removed', o, a))
          }
        }
        return !0
      }),
      (QueuesPlugin.prototype._handleMessageMemberCallAdd = function (e, t) {
        if ('add' != t) return !1
        var n = e.getElementsByTagName('call')
        if (0 == n.length) return !1
        for (var i = 0; i < n.length; i++) {
          var r = n.item(i),
            s = this._parseMemberCallItem(r),
            o = this.getQueue(s.queue)
          if (o) {
            var a = o.getMember(s.location)
            if (a) {
              var h = QueueCall.fromObject(s)
              a._addCall(h), this._fire('call_added', o, a, h)
            }
          }
        }
        return !0
      }),
      (QueuesPlugin.prototype._handleMessageMemberCallRemove = function (e, t) {
        if ('remove' != t) return !1
        var n = e.getElementsByTagName('call')
        if (0 == n.length) return !1
        for (var i = 0; i < n.length; i++) {
          var r = n.item(i),
            s = this._parseMemberCallItem(r),
            o = this.getQueue(s.queue)
          if (o) {
            var a = o.getMember(s.location)
            if (a) {
              var h = a.getCall(s.channel)
              h && (a._removeCall(h), this._fire('call_removed', o, a, h))
            }
          }
        }
        return !0
      }),
      (QueuesPlugin.prototype._handleMessageUserJoin = function (e, t) {
        if ('join' != t) return !1
        var n = e.getElementsByTagName('user')
        if (0 == n.length) return !1
        for (var i = 0; i < n.length; i++) {
          var r = n.item(i),
            s = this._parseUserItem(r),
            o = this.getQueue(s.queue)
          if (o) {
            var a = o.getMember(s.channel)
            a || ((a = QueueUser.fromObject(s)), o._addUser(a), this._fire('user_join', o, a))
          }
        }
        return !0
      }),
      (QueuesPlugin.prototype._handleMessageUserLeave = function (e, t) {
        if ('leave' != t) return !1
        var n = e.getElementsByTagName('user')
        if (0 == n.length) return !1
        for (var i = 0; i < n.length; i++) {
          var r = n.item(i),
            s = this._parseUserItem(r),
            o = this.getQueue(s.queue)
          if (o) {
            var a = o.getUser(s.channel)
            a && (o._removeUser(a), this._fire('user_left', o, a))
          }
        }
        return !0
      }),
      (QueuesPlugin.prototype._handleSubscribeResponse = function (e, t, n) {
        this._queues = this._parseSubscribeResponse(e)
        for (var i = 0; i < this._queues.length; i++) this._fire('queue_added', this._queues[i])
        'function' == typeof t && t.call(n, this._queues)
      }),
      (QueuesPlugin.prototype._handleUnsubscribeResponse = function (e, t, n) {
        for (var i = 0; i < this._queues.length; i++) this._fire('queue_removed', this._queues[i])
        ;(this._queues = []), (this._subscribed = !1), 'function' == typeof t && t.call(n)
      }),
      (QueuesPlugin.prototype._createIqHandler = (e, t) => ({
        error_handler: n => {
          var i = n.getNode().getElementsByTagName('error'),
            r = 'unknown'
          if (i.length > 0) {
            var s = i[0].firstChild
            s && (r = s.tagName)
          }
          e.call(t, r)
        },
        result_handler: () => {
          e.call(t, null)
        },
      })),
      (QueuesPlugin.prototype._createSubscribePacket = () => {
        var e = new JSJaCIQ().setType('set'),
          t = e.setQuery(NS_QUEUES),
          n = e.getDoc().createElement('subscribe')
        return t.appendChild(n), e
      }),
      (QueuesPlugin.prototype._createUnsubscribePacket = () => {
        var e = new JSJaCIQ().setType('set'),
          t = e.setQuery(NS_QUEUES),
          n = e.getDoc().createElement('unsubscribe')
        return t.appendChild(n), e
      }),
      (QueuesPlugin.prototype._createAddPacket = (e, t) => {
        var n = new JSJaCIQ().setType('set'),
          i = n.setQuery(NS_QUEUES),
          r = n.getDoc().createElement('add')
        return r.setAttribute('queue', e.getId()), r.setAttribute('extension', t), i.appendChild(r), n
      }),
      (QueuesPlugin.prototype._createRemovePacket = (e, t) => {
        var n = new JSJaCIQ().setType('set'),
          i = n.setQuery(NS_QUEUES),
          r = n.getDoc().createElement('remove')
        return (
          r.setAttribute('queue', e.getId()),
          r.setAttribute('location', t.getLocation()),
          i.appendChild(r),
          n
        )
      }),
      (QueuesPlugin.prototype._createPausePacket = (e, t) => {
        var n = new JSJaCIQ().setType('set'),
          i = n.setQuery(NS_QUEUES),
          r = n.getDoc().createElement('pause')
        return (
          r.setAttribute('queue', e.getId()),
          r.setAttribute('location', t.getLocation()),
          i.appendChild(r),
          n
        )
      }),
      (QueuesPlugin.prototype._createResumePacket = (e, t) => {
        var n = new JSJaCIQ().setType('set'),
          i = n.setQuery(NS_QUEUES),
          r = n.getDoc().createElement('unpause')
        return (
          r.setAttribute('queue', e.getId()),
          r.setAttribute('location', t.getLocation()),
          i.appendChild(r),
          n
        )
      }),
      (QueuesPlugin.prototype._parseSubscribeResponse = function (e) {
        for (
          var t = e.getChild('queues', NS_QUEUES).getElementsByTagName('queue'), n = [], i = 0;
          i < t.length;
          i++
        ) {
          for (
            var r = t.item(i),
              s = new Queue(r.getAttribute('id'), r.getAttribute('name')),
              o = r.getElementsByTagName('member'),
              a = r.getElementsByTagName('user'),
              h = 0;
            h < o.length;
            h++
          ) {
            for (
              var u = o.item(h),
                c = QueueMember.fromObject(this._parseMemberItem(u)),
                l = u.getElementsByTagName('call'),
                p = 0;
              p < l.length;
              p++
            ) {
              var d = QueueCall.fromObject(this._parseMemberCallItem(l[p]))
              c._addCall(d)
            }
            s._addMember(c)
          }
          for (h = 0; h < a.length; h++) {
            var _ = a.item(h),
              g = QueueUser.fromObject(this._parseUserItem(_))
            s._addUser(g)
          }
          n.push(s)
        }
        return n
      }),
      (QueuesPlugin.prototype._parseMemberItem = e => ({
        queue: e.getAttribute('queue'),
        location: e.getAttribute('location'),
        extension: e.getAttribute('extension'),
        name: e.getAttribute('name'),
        membership: e.getAttribute('membership'),
        penalty: e.getAttribute('penalty'),
        status: e.getAttribute('status'),
        pause: e.getAttribute('pause'),
        sleep: e.getAttribute('sleep'),
      })),
      (QueuesPlugin.prototype._parseMemberCallItem = e => ({
        queue: e.getAttribute('queue'),
        location: e.getAttribute('location'),
        channel: e.getAttribute('channel'),
        destination: e.getAttribute('destination'),
        calleeNumber: e.getAttribute('connected_line_num'),
        calleeName: e.getAttribute('connected_line_name'),
        duration: e.getAttribute('duration'),
      })),
      (QueuesPlugin.prototype._parseUserItem = e => ({
        queue: e.getAttribute('queue'),
        channel: e.getAttribute('channel'),
        num: e.getAttribute('num'),
        name: e.getAttribute('name'),
        duration: e.getAttribute('duration'),
      })),
      (Queue.prototype.getId = function () {
        return this._id
      }),
      (Queue.prototype.getMember = function (e) {
        for (var t = 0; t < this._members.length; t++)
          if (this._members[t].getLocation() == e) return this._members[t]
        return null
      }),
      (Queue.prototype.getMembers = function () {
        return this._members
      }),
      (Queue.prototype._addMember = function (e) {
        this._members.push(e)
      }),
      (Queue.prototype._removeMember = function (e) {
        for (var t in this._members)
          if (this._members[t] == e) {
            this._members.splice(t, 1)
            break
          }
      }),
      (Queue.prototype.getUser = function (e) {
        for (var t = 0; t < this._users.length; t++)
          if (this._users[t].getChannel() == e) return this._users[t]
        return null
      }),
      (Queue.prototype.getUsers = function () {
        return this._users
      }),
      (Queue.prototype._addUser = function (e) {
        this._users.push(e)
      }),
      (Queue.prototype._removeUser = function (e) {
        for (var t in this._users)
          if (this._users[t] == e) {
            this._users.splice(t, 1)
            break
          }
      }),
      (QueueMember.fromObject = e =>
        new QueueMember(
          e.location,
          e.extension,
          e.name,
          e.membership,
          e.penalty,
          e.status,
          e.pause,
          e.sleep
        )),
      (QueueMember.prototype.getLocation = function () {
        return this._location
      }),
      (QueueMember.prototype.getExtension = function () {
        return this._extension
      }),
      (QueueMember.prototype.getName = function () {
        return this._name
      }),
      (QueueMember.prototype.isStaticMember = function () {
        return 'static' == this._membership
      }),
      (QueueMember.prototype.isDynamicMember = function () {
        return 'dynamic' == this._membership
      }),
      (QueueMember.prototype.getPenalty = function () {
        return this._penalty
      }),
      (QueueMember.prototype.getStatus = function () {
        return this._status
      }),
      (QueueMember.prototype.isPaused = function () {
        return 'true' == this._pause
      }),
      (QueueMember.prototype.getSleepTime = function () {
        var e = Math.round(new Date().getTime() / 1e3) - this._sleepSetTime
        return this._sleep + e
      }),
      (QueueMember.prototype.getTalkTime = function () {
        return this._calls.length > 0 ? this._calls[0].getDuration() : 0
      }),
      (QueueMember.prototype.getCall = function (e) {
        for (var t = 0; t < this._calls.length; t++)
          if (this._calls[t].getChannel() == e) return this._calls[t]
        return null
      }),
      (QueueMember.prototype.getCalls = function () {
        return this._calls
      }),
      (QueueMember.prototype._addCall = function (e) {
        this._calls.push(e)
      }),
      (QueueMember.prototype._removeCall = function (e) {
        for (var t in this._calls)
          if (this._calls[t] == e) {
            this._calls.splice(t, 1)
            break
          }
        0 == this._calls.length && (this._sleepSetTime = Math.round(new Date().getTime() / 1e3))
      }),
      (QueueMember.prototype._updateFromObject = function (e) {
        ;(this._location = e.location),
          (this._extension = e.extension),
          (this._membership = e.membership),
          (this._penalty = e.penalty),
          (this._status = e.status),
          (this._pause = e.pause),
          (this._sleep = parseInt(e.sleep)),
          (this._sleepSetTime = Math.round(new Date().getTime() / 1e3))
      }),
      (QueueUser.fromObject = e => new QueueUser(e.channel, e.num, e.name, e.duration)),
      (QueueUser.prototype.getChannel = function () {
        return this._channel
      }),
      (QueueUser.prototype.getNumber = function () {
        return this._num
      }),
      (QueueUser.prototype.getName = function () {
        return this._name
      }),
      (QueueUser.prototype.getDuration = function () {
        var e = Math.round(new Date().getTime() / 1e3) - this._durationSetTime
        return this._duration + e
      }),
      (QueueCall.fromObject = e =>
        new QueueCall(e.channel, e.destination, e.calleeNumber, e.calleeName, e.duration)),
      (QueueCall.prototype.getChannel = function () {
        return this._channel
      }),
      (QueueCall.prototype.getDestinationChannel = function () {
        return this._destinationChannel
      }),
      (QueueCall.prototype.getCalleeNumber = function () {
        return this._calleeNumber
      }),
      (QueueCall.prototype.getCalleeName = function () {
        return this._calleeName
      }),
      (QueueCall.prototype.getDuration = function () {
        var e = Math.round(new Date().getTime() / 1e3) - this._durationSetTime
        return this._duration + e
      }),
      (ChatPlugin.prototype = Object.create(WTAPI.Observable.prototype)),
      (ChatPlugin.prototype.send = function (e, t) {
        var n = new JSJaCMessage()
        n.setID(t.getId()),
          n.setTo(e.getJid()),
          n.setType('chat'),
          n.setBody(t.getBody()),
          n.appendNode('request', {
            xmlns: 'urn:xmpp:receipts',
          }),
          n.appendNode('markable', {
            xmlns: 'urn:xmpp:chat-markers:0',
          }),
          this._wtapi.getConnection().send(n)
      }),
      (ChatPlugin.prototype.sendDeliveryConfirmation = function (e, t) {
        var n = new JSJaCMessage()
        n.setTo(e.getJid()),
          n.setType('chat'),
          n.appendNode('received', {
            xmlns: 'urn:xmpp:receipts',
            id: t.getId(),
          }),
          n.appendNode('displayed', {
            xmlns: 'urn:xmpp:chat-markers:0',
            id: t.getId(),
          }),
          n.appendNode('store', {
            xmlns: 'urn:xmpp:hints',
          }),
          this._wtapi.getConnection().send(n)
      }),
      (ChatPlugin.prototype._handleMessage = function (e) {
        if (this._handleMessageDelivery(e)) return !0
        var t = e.getType(),
          n = e.getBody()
        if (('' != t && 'chat' != t && 'normal' != t) || 0 == n.length) return !1
        var i = e.getID(),
          r = new WTAPI.Message.Builder()
        r.withId(i), r.withBody(n)
        var s = r.build(),
          o = e.getChildVal('nick', 'http://jabber.org/protocol/nick'),
          a = e.getFromJID().removeResource().toString(),
          h = this._roster.getUser(a)
        null === h && ('' == o && (o = null), (h = this._roster.createUser(a, o))),
          this._fire('message_received', h, s)
      }),
      (ChatPlugin.prototype._handleMessageDelivery = function (e) {
        var t = e.getNode().getElementsByTagName('received')
        if (1 == t.length) {
          if ('urn:xmpp:receipts' != t.item(0).namespaceURI) return !1
        } else t = e.getNode().getElementsByTagName('displayed')
        if (1 == t.length) {
          var n = t.item(0).getAttribute('id'),
            i = e.getFromJID().removeResource().toString(),
            r = this._roster.getUser(i)
          r && n && this._fire('message_delivered', r, n)
        }
      })
    var NS_WILDIX_PRESENCE = 'urn:wildix:presence',
      NS_WILDIX_SUBSCRIPTIONS = 'urn:wildix:subscriptions'
    function PresencePlugin(e) {
      ;(this._presences = {}),
        (this._presences = {}),
        (this._subscriptions = []),
        (this._wtapi = e),
        this._wtapi.registerHandler('iq', this._handleIQ, this, 10),
        this._wtapi.registerHandler('presence', this._handlePresence, this, 10),
        this._wtapi.addListener('connected', this._onConnected, this),
        this._wtapi.addListener('disconnected', this._onDisconnected, this),
        (this._roster = this._wtapi.roster),
        (this._empty_presence = new WTAPI.Presence()),
        (this._personal_presence = this._empty_presence),
        WTAPI.Observable.call(this)
    }
    return (
      (PresencePlugin.prototype = Object.create(WTAPI.Observable.prototype)),
      (PresencePlugin.prototype.getPersonalPresence = function () {
        return this._personal_presence
      }),
      (PresencePlugin.prototype.changePersonalPresence = function (e, t) {
        if (!(e instanceof WTAPI.Presence))
          throw new Error('Presence should be an instance of WTAPI.Presence')
        var n = arguments[2] || this,
          i = this._createSetPresencePacket(e),
          r = this._createSetPresenceHandler(t, n)
        this._wtapi.getConnection().sendIQ(i, r)
      }),
      (PresencePlugin.prototype.get = function (e) {
        var t = e.getJid()
        return t in this._presences ? this._presences[t] : this._empty_presence
      }),
      (PresencePlugin.prototype.getSubscriptions = function (e) {
        var t = arguments[1] || this,
          n = this._createGetSubscriptionsPacket(),
          i = this._createGetSubscriptionsHandler(e, t)
        this._wtapi.getConnection().sendIQ(n, i)
      }),
      (PresencePlugin.prototype.subscribe = function (e, t) {
        for (var n = this._subscriptions.slice(0), i = 0; i < e.length; i++) {
          for (var r = e[i], s = !1, o = 0; o < n.length; o++)
            if (n[o] == r) {
              s = !0
              break
            }
          s || n.push(r)
        }
        var a = arguments[1] || this,
          h = this._createSetSubscriptionsPacket(n),
          u = this._createSetSubscriptionsHandler(t, a)
        ;(this._subscriptions = n), this._wtapi.getConnection().sendIQ(h, u)
      }),
      (PresencePlugin.prototype.unsubscribe = function (e, t) {
        for (var n = [], i = 0; i < this._subscriptions.length; i++) {
          for (var r = this._subscriptions[i], s = !1, o = 0; o < e.length; o++)
            if (e[o] == r) {
              s = !0
              break
            }
          s || n.push(r)
        }
        var a = arguments[1] || this,
          h = this._createSetSubscriptionsPacket(n),
          u = this._createSetSubscriptionsHandler(t, a)
        ;(this._subscriptions = n), this._wtapi.getConnection().sendIQ(h, u)
      }),
      (PresencePlugin.prototype._onConnected = function () {
        this._subscriptions.length > 0 &&
          this._wtapi.getConnection().sendIQ(
            this._createSetSubscriptionsPacket(this._subscriptions),
            this._createSetSubscriptionsHandler(() => {}, this)
          ),
          this._wtapi
            .getConnection()
            .sendIQ(this._createGetPersonalPresencePacket(), this._createGetPersonalPresenceHandler())
      }),
      (PresencePlugin.prototype._onDisconnected = function () {
        for (var e in this._presences) {
          if (this._presences[e] instanceof WTAPI.Presence) {
            var t = this._roster.getUser(e)
            t &&
              ((this._presences[e] = this._empty_presence),
              this._fire('presence_changed', t, this._empty_presence))
          }
        }
        ;(this._presences = {}),
          (this._personal_presence = this._empty_presence),
          this._fire('personal_presence_changed', this._personal_presence)
      }),
      (PresencePlugin.prototype._handleIQ = function (e) {
        return (
          e.getQueryXMLNS() == NS_WILDIX_PRESENCE &&
          ((this._personal_presence = this._parsePersonalPresence(e.getNode()).build()),
          this._fire('personal_presence_changed', this._personal_presence),
          !0)
        )
      }),
      (PresencePlugin.prototype._handlePresence = function (e) {
        var t = e.getFromJID()
        t.getResource()
        var n = e.getNode(),
          i = e.getChildVal('nick', 'http://jabber.org/protocol/nick'),
          r = t.removeResource().toString(),
          s = this._parsePresence(n).build(),
          o = this._roster.getUser(r)
        null === o && ('' == i && (i = null), (o = this._roster.createUser(r, i))),
          (this._presences[o.getJid()] = s),
          this._fire('presence_changed', o, s)
      }),
      (PresencePlugin.prototype._createGetSubscriptionsPacket = () => {
        var e = new JSJaCIQ().setType('get')
        return e.setQuery(NS_WILDIX_SUBSCRIPTIONS), e
      }),
      (PresencePlugin.prototype._createGetPersonalPresencePacket = () => {
        var e = new JSJaCIQ().setType('get')
        return e.setQuery(NS_WILDIX_PRESENCE), e
      }),
      (PresencePlugin.prototype._createGetSubscriptionsHandler = function (e, t) {
        return {
          result_handler: i => {
            'function' == typeof e && e.call(t, this._parseGetSubscriptionsResponse(i))
          },
          error_handler: () => {
            'function' == typeof e && e.call(t, [])
          },
        }
      }),
      (PresencePlugin.prototype._createGetPersonalPresenceHandler = function () {
        return {
          result_handler: t => {
            ;(this._personal_presence = this._parsePersonalPresence(t.getNode()).build()),
              this._fire('personal_presence_changed', this._personal_presence)
          },
          error_handler: () => {},
        }
      }),
      (PresencePlugin.prototype._createSetSubscriptionsPacket = e => {
        for (
          var t = new JSJaCIQ().setType('set'),
            n = t.setQuery(NS_WILDIX_SUBSCRIPTIONS),
            i = t.getDoc().createElement('subscriptions'),
            r = 0;
          r < e.length;
          r++
        ) {
          var s = t.getDoc().createElement('item')
          s.setAttribute('user', e[r]), i.appendChild(s)
        }
        return n.appendChild(i), t
      }),
      (PresencePlugin.prototype._createSetSubscriptionsHandler = function (e, t) {
        return {
          result_handler: i => {
            'function' == typeof e && e.call(t, this._parseGetSubscriptionsResponse(i))
          },
          error_handler: () => {
            'function' == typeof e && e.call(t, [])
          },
        }
      }),
      (PresencePlugin.prototype._createSetPresencePacket = function (e) {
        var t = new JSJaCIQ().setType('set'),
          n = t.setQuery(NS_WILDIX_PRESENCE),
          i = t.getDoc().createElement('extra')
        if (
          (e.isAway() || e.isDND()
            ? n.appendChild(t.buildNode('show', {}, e.isAway() ? 'away' : 'dnd'))
            : e.isMUR() && n.appendChild(t.buildNode('show', {}, 'mur')),
          e.isStatusMessageAvailable() &&
            n.appendChild(t.buildNode('status', {}, e.getStatusMessage())),
          e.isStatusUntilAvailable() &&
            (e.isAway() || e.isDND()) &&
            i.appendChild(t.buildNode('until', {}, this._formatUntilDate(e.getStatusUntil()))),
          e.isLocationAvailable())
        ) {
          var r = t.getDoc().createElement('location')
          r.appendChild(t.buildNode('lat', {}, e.getLocation().getLat())),
            r.appendChild(t.buildNode('lng', {}, e.getLocation().getLng())),
            r.appendChild(t.buildNode('address', {}, e.getLocation().getAddress())),
            i.appendChild(r)
        }
        return i.childNodes.length > 0 && n.appendChild(i), t
      }),
      (PresencePlugin.prototype._createSetPresenceHandler = function (e, t) {
        return {
          result_handler: i => {
            ;(this._personal_presence = this._parsePersonalPresence(i.getNode()).build()),
              this._fire('personal_presence_changed', this._personal_presence),
              'function' == typeof e && e.call(t, this._personal_presence)
          },
          error_handler: () => {
            'function' == typeof e && e.call(t, this._personal_presence)
          },
        }
      }),
      (PresencePlugin.prototype._parsePresence = function (e) {
        var t = new WTAPI.Presence.Builder()
        ;(e.hasAttribute('type') && 'unavailable' == e.getAttribute('type')) || t.setOnline()
        var n = e.getElementsByTagName('show')
        if (n.length > 0 && n.item(0).firstChild)
          switch (n.item(0).firstChild.nodeValue) {
            case 'away':
              t.setAway()
              break
            case 'dnd':
              t.setDND()
              break
            case 'mur':
              t.setMUR()
          }
        var i = e.getElementsByTagName('status')
        i.length > 0 && i.item(0).firstChild && t.setStatusMessage(i.item(0).firstChild.nodeValue)
        var r = e.getElementsByTagName('extra')
        if (r.length > 0) {
          var s,
            o = (r = r.item(0)).getElementsByTagName('device-show')
          if (o.length > 0 && o.item(0).firstChild)
            switch (o.item(0).firstChild.nodeValue) {
              case 'ringing':
                t.setRinging()
                break
              case 'talking':
                t.setTalking()
                break
              case 'rt':
                t.setRingingAndTalking()
                break
              case 'registered':
                t.setRegisteredDevice()
            }
          if ((s = r.getElementsByTagName('until')).length > 0 && s.item(0).firstChild)
            null !== (s = this._parseUntilDate(s.item(0).firstChild.nodeValue)) && t.setStatusUntil(s)
          var a = r.getElementsByTagName('location')
          if (a.length > 0) {
            var h,
              u,
              c,
              l = (a = a.item(0)).getElementsByTagName('lat'),
              p = a.getElementsByTagName('lng'),
              d = a.getElementsByTagName('address')
            l.length > 0 && l.item(0).firstChild && (h = l.item(0).firstChild.nodeValue),
              p.length > 0 && p.item(0).firstChild && (u = p.item(0).firstChild.nodeValue),
              d.length > 0 && d.item(0).firstChild && (c = d.item(0).firstChild.nodeValue),
              h && u && c && t.setLocation(new WTAPI.Location(c, h, u))
          }
          var _ = r.getElementsByTagName('connected-info')
          if (_.length > 0) {
            var g,
              m,
              f = (_ = _.item(0)).getElementsByTagName('connected-name')
            f.length > 0 && f.item(0).firstChild && (g = f.item(0).firstChild.nodeValue)
            var y = _.getElementsByTagName('connected-id')
            y.length > 0 && y.item(0).firstChild && (m = y.item(0).firstChild.nodeValue),
              (g || m) && t.setConnectedCall(new WTAPI.ConnectedCall(g, m))
          }
          var S = r.getElementsByTagName('profile_data')
          if (S.length > 0) {
            var C, b, J, v, A, T, P
            C = b = J = v = A = T = P = ''
            var I = (S = S.item(0)).getElementsByTagName('mail'),
              N = S.getElementsByTagName('auth_provider'),
              D = S.getElementsByTagName('profile_url'),
              w = S.getElementsByTagName('gender'),
              x = S.getElementsByTagName('language'),
              E = S.getElementsByTagName('parentHostUrl'),
              R = S.getElementsByTagName('photo_url')
            I.length > 0 && I.item(0).firstChild && (C = I.item(0).firstChild.nodeValue),
              N.length > 0 && N.item(0).firstChild && (b = N.item(0).firstChild.nodeValue),
              D.length > 0 && D.item(0).firstChild && (J = D.item(0).firstChild.nodeValue),
              w.length > 0 && w.item(0).firstChild && (v = w.item(0).firstChild.nodeValue),
              x.length > 0 && x.item(0).firstChild && (A = x.item(0).firstChild.nodeValue),
              E.length > 0 && E.item(0).firstChild && (T = E.item(0).firstChild.nodeValue),
              R.length > 0 && R.item(0).firstChild && (P = R.item(0).firstChild.nodeValue),
              t.setProfileData(new WTAPI.ProfileData(C, b, J, v, A, T, P))
          }
        }
        return t
      }),
      (PresencePlugin.prototype._parsePersonalPresence = function (e) {
        return this._parsePresence(e).setOnline()
      }),
      (PresencePlugin.prototype._parseGetSubscriptionsResponse = function (e) {
        var t = [],
          n = e.getNode().getElementsByTagName('subscriptions')
        if (1 != n.length) return t
        for (var i = n.item(0).getElementsByTagName('item'), r = 0; r < i.length; r++) {
          var s = i.item(r)
          if (s.hasAttribute('user')) {
            var o = s.getAttribute('user'),
              a = o
            if (this._wtapi.isNewServer())
              o.split('@').length <= 1 && (a = o + '@' + this._wtapi.server)
            else a = o + '@wildix'
            var h = this._roster.getUser(a)
            null === h && (h = this._roster.createUser(a)), t.push(h)
          }
        }
        return t
      }),
      (PresencePlugin.prototype._parseUntilISODate = e => {
        var t = new Date(e)
        return t || null
      }),
      (PresencePlugin.prototype._parseUntilDate = function (e) {
        var t = /(\d{1,2})\/(\d{1,2})\/(\d{4})\s(\d{1,2}):(\d{1,2})/.exec(e)
        if (null === t) return this._parseUntilISODate(e)
        var n = parseInt(t[3]),
          i = parseInt(t[2]) - 1,
          r = parseInt(t[1]),
          s = parseInt(t[4]),
          o = parseInt(t[5])
        return new Date(Date.UTC(n, i, r, s, o, 0))
      }),
      (PresencePlugin.prototype._formatUntilDate = e => {
        function t(e) {
          return e < 10 ? '0' + e : e
        }
        return (
          e.getUTCFullYear() +
          '-' +
          t(e.getUTCMonth() + 1) +
          '-' +
          t(e.getUTCDate()) +
          'T' +
          t(e.getUTCHours()) +
          ':' +
          t(e.getUTCMinutes()) +
          ':' +
          t(e.getUTCSeconds()) +
          'Z'
        )
      }),
      (WTAPI.ajax = ajax),
      WTAPI.addPlugin('roster', RosterPlugin),
      WTAPI.addPlugin('telephony', TelephonyPlugin),
      WTAPI.addPlugin('queues', QueuesPlugin),
      WTAPI.addPlugin('chat', ChatPlugin),
      WTAPI.addPlugin('presence', PresencePlugin),
      WTAPI
    )
  })
  