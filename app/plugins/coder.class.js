class Coder {
  /**
   * Constructor
   * @param options
   */
  constructor (options) {
    this._options = options || {}
  }

  /**
   * To encode the unicode string into Base64-encoded-url value
   *
   * @param str
   * @return {string}
   */
  static b64UrlEncodeUnicode (str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    const b64Encoded = btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes (match, p1) {
        return String.fromCharCode('0x' + p1)
      }))
    // Replace for URL
    return b64Encoded.replace(/\+/g, '-').replace(/\//g, '_')
  }

  /**
   * To decode the Base64-encoded-url value back into a String
   *
   * @param str
   * @return {string}
   */
  static b64UrlDecodeUnicode (str) {
    const encodedBody = str.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '')
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(encodedBody).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
  }

  /**
   * To encode the unicode string to Base64-encoded value
   * etc.
   * b64EncodeUnicode("✓ à la mode"); // '4pyTIMOgIGxhIG1vZGU='
   * b64EncodeUnicode("\n"); // 'Cg=='
   * @param str
   * @return {string}
   */
  static b64EncodeUnicode (str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    const b64Encoded = btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes (match, p1) {
        return String.fromCharCode('0x' + p1)
      }))
    // Replace for URL
    return b64Encoded
  }

  /**
   * To decode the Base64-encoded value back into a String
   * etc.
   * b64DecodeUnicode('4pyTIMOgIGxhIG1vZGU='); // "✓ à la mode"
   * b64DecodeUnicode('Cg=='); // "\n"
   *
   * @param str
   * @return {string}
   */
  static b64DecodeUnicode (str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
  }
}

export default Coder
