[35m[4m[1m# TLS (SSL)[22m[24m[39m

[90m<!--introduced_in=v0.10.0-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[0mThe [33mtls[39m module provides an implementation of the Transport Layer Security[0m
[0m(TLS) and Secure Socket Layer (SSL) protocols that is built on top of OpenSSL.[0m
[0mThe module can be accessed using:[0m

    [94mconst[39m [37mtls[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/tls'[39m[90m)[39m[90m;[39m

[32m[1m## TLS/SSL Concepts[22m[39m

[0mThe TLS/SSL is a public/private key infrastructure (PKI). For most common[0m
[0mcases, each client and server must have a [3mprivate key[23m.[0m

[0mPrivate keys can be generated in multiple ways. The example below illustrates[0m
[0muse of the OpenSSL command-line interface to generate a 2048-bit RSA private[0m
[0mkey:[0m

    [33mopenssl genrsa -out ryans-key.pem 2048[39m

[0mWith TLS/SSL, all servers (and some clients) must have a [3mcertificate*.[23m[0m
[0m[3mCertificates are *public keys[23m that correspond to a private key, and that are[0m
[0mdigitally signed either by a Certificate Authority or by the owner of the[0m
[0mprivate key (such certificates are referred to as "self-signed"). The first[0m
[0mstep to obtaining a certificate is to create a [3mCertificate Signing Request[23m[0m
[0m(CSR) file.[0m

[0mThe OpenSSL command-line interface can be used to generate a CSR for a private[0m
[0mkey:[0m

    [33mopenssl req -new -sha256 -key ryans-key.pem -out ryans-csr.pem[39m

[0mOnce the CSR file is generated, it can either be sent to a Certificate[0m
[0mAuthority for signing or used to generate a self-signed certificate.[0m

[0mCreating a self-signed certificate using the OpenSSL command-line interface[0m
[0mis illustrated in the example below:[0m

    [33mopenssl x509 -req -in ryans-csr.pem -signkey ryans-key.pem -out ryans-cert.pem[39m

[0mOnce the certificate is generated, it can be used to generate a [33m.pfx[39m or[0m
[0m[33m.p12[39m file:[0m

    [33mopenssl pkcs12 -export -in ryans-cert.pem -inkey ryans-key.pem \[39m
    [33m      -certfile ca-cert.pem -out ryans.pfx[39m

[0mWhere:[0m

    * [0m[33min[39m: is the signed certificate[0m
    * [0m[33minkey[39m: is the associated private key[0m
    * [0m[33mcertfile[39m: is a concatenation of all Certificate Authority (CA) certs into[0m
      [0m a single file, e.g. [33mcat ca1-cert.pem ca2-cert.pem > ca-cert.pem[39m[0m

[32m[1m### Perfect Forward Secrecy[22m[39m

[90m<!-- type=misc -->[39m
[90m[39m
[90m[39m[0mThe term "[Forward Secrecy][]" or "Perfect Forward Secrecy" describes a feature[0m
[0mof key-agreement (i.e., key-exchange) methods. That is, the server and client[0m
[0mkeys are used to negotiate new temporary keys that are used specifically and[0m
[0monly for the current communication session. Practically, this means that even[0m
[0mif the server's private key is compromised, communication can only be decrypted[0m
[0mby eavesdroppers if the attacker manages to obtain the key-pair specifically[0m
[0mgenerated for the session.[0m

[0mPerfect Forward Secrecy is achieved by randomly generating a key pair for[0m
[0mkey-agreement on every TLS/SSL handshake (in contrast to using the same key for[0m
[0mall sessions). Methods implementing this technique are called "ephemeral".[0m

[0mCurrently two methods are commonly used to achieve Perfect Forward Secrecy (note[0m
[0mthe character "E" appended to the traditional abbreviations):[0m

    * [0m[DHE][]: An ephemeral version of the Diffie Hellman key-agreement protocol.[0m
    * [0m[ECDHE][]: An ephemeral version of the Elliptic Curve Diffie Hellman[0m
      [0mkey-agreement protocol.[0m

[0mEphemeral methods may have some performance drawbacks, because key generation[0m
[0mis expensive.[0m

[0mTo use Perfect Forward Secrecy using [33mDHE[39m with the [33mtls[39m module, it is required[0m
[0mto generate Diffie-Hellman parameters and specify them with the [33mdhparam[39m[0m
[0moption to [[33mtls.createSecureContext()[39m][]. The following illustrates the use of[0m
[0mthe OpenSSL command-line interface to generate such parameters:[0m

    [33mopenssl dhparam -outform PEM -out dhparam.pem 2048[39m

[0mIf using Perfect Forward Secrecy using [33mECDHE[39m, Diffie-Hellman parameters are[0m
[0mnot required and a default ECDHE curve will be used. The [33mecdhCurve[39m property[0m
[0mcan be used when creating a TLS Server to specify the list of names of supported[0m
[0mcurves to use, see [[33mtls.createServer()[39m][] for more info.[0m

[0mPerfect Forward Secrecy was optional up to TLSv1.2, but it is not optional for[0m
[0mTLSv1.3, because all TLSv1.3 cipher suites use ECDHE.[0m

[32m[1m### ALPN and SNI[22m[39m

[90m<!-- type=misc -->[39m
[90m[39m
[90m[39m[0mALPN (Application-Layer Protocol Negotiation Extension) and[0m
[0mSNI (Server Name Indication) are TLS handshake extensions:[0m

    * [0mALPN: Allows the use of one TLS server for multiple protocols (HTTP, HTTP/2)[0m
    * [0mSNI: Allows the use of one TLS server for multiple hostnames with different[0m
      [0mSSL certificates.[0m

[32m[1m### Pre-shared keys[22m[39m

[90m<!-- type=misc -->[39m
[90m[39m
[90m[39m[0mTLS-PSK support is available as an alternative to normal certificate-based[0m
[0mauthentication. It uses a pre-shared key instead of certificates to[0m
[0mauthenticate a TLS connection, providing mutual authentication.[0m
[0mTLS-PSK and public key infrastructure are not mutually exclusive. Clients and[0m
[0mservers can accommodate both, choosing either of them during the normal cipher[0m
[0mnegotiation step.[0m

[0mTLS-PSK is only a good choice where means exist to securely share a[0m
[0mkey with every connecting machine, so it does not replace PKI[0m
[0m(Public Key Infrastructure) for the majority of TLS uses.[0m
[0mThe TLS-PSK implementation in OpenSSL has seen many security flaws in[0m
[0mrecent years, mostly because it is used only by a minority of applications.[0m
[0mPlease consider all alternative solutions before switching to PSK ciphers.[0m
[0mUpon generating PSK it is of critical importance to use sufficient entropy as[0m
[0mdiscussed in [RFC 4086][]. Deriving a shared secret from a password or other[0m
[0mlow-entropy sources is not secure.[0m

[0mPSK ciphers are disabled by default, and using TLS-PSK thus requires explicitly[0m
[0mspecifying a cipher suite with the [33mciphers[39m option. The list of available[0m
[0mciphers can be retrieved via [33mopenssl ciphers -v 'PSK'[39m. All TLS 1.3[0m
[0mciphers are eligible for PSK but currently only those that use SHA256 digest are[0m
[0msupported they can be retrieved via [33mopenssl ciphers -v -s -tls1_3 -psk[39m.[0m

[0mAccording to the [RFC 4279][], PSK identities up to 128 bytes in length and[0m
[0mPSKs up to 64 bytes in length must be supported. As of OpenSSL 1.1.0[0m
[0mmaximum identity size is 128 bytes, and maximum PSK length is 256 bytes.[0m

[0mThe current implementation doesn't support asynchronous PSK callbacks due to the[0m
[0mlimitations of the underlying OpenSSL API.[0m

[32m[1m### Client-initiated renegotiation attack mitigation[22m[39m

[90m<!-- type=misc -->[39m
[90m[39m
[90m[39m[0mThe TLS protocol allows clients to renegotiate certain aspects of the TLS[0m
[0msession. Unfortunately, session renegotiation requires a disproportionate amount[0m
[0mof server-side resources, making it a potential vector for denial-of-service[0m
[0mattacks.[0m

[0mTo mitigate the risk, renegotiation is limited to three times every ten minutes.[0m
[0mAn [33m'error'[39m event is emitted on the [[33mtls.TLSSocket[39m][] instance when this[0m
[0mthreshold is exceeded. The limits are configurable:[0m

    * [0m[33mtls.CLIENT_RENEG_LIMIT[39m {number} Specifies the number of renegotiation[0m
      [0mrequests. [1mDefault:[22m [33m3[39m.[0m
    * [0m[33mtls.CLIENT_RENEG_WINDOW[39m {number} Specifies the time renegotiation window[0m
      [0min seconds. [1mDefault:[22m [33m600[39m (10 minutes).[0m

[0mThe default renegotiation limits should not be modified without a full[0m
[0munderstanding of the implications and risks.[0m

[0mTLSv1.3 does not support renegotiation.[0m

[32m[1m### Session Resumption[22m[39m

[0mEstablishing a TLS session can be relatively slow. The process can be sped[0m
[0mup by saving and later reusing the session state. There are several mechanisms[0m
[0mto do so, discussed here from oldest to newest (and preferred).[0m

[0m[1m[3mSession Identifiers[23m[22m Servers generate a unique ID for new connections and[0m
[0msend it to the client. Clients and servers save the session state. When[0m
[0mreconnecting, clients send the ID of their saved session state and if the server[0m
[0malso has the state for that ID, it can agree to use it. Otherwise, the server[0m
[0mwill create a new session. See [RFC 2246][] for more information, page 23 and[0m
[0m30.[0m

[0mResumption using session identifiers is supported by most web browsers when[0m
[0mmaking HTTPS requests.[0m

[0mFor Node.js, clients wait for the [[33m'session'[39m][] event to get the session data,[0m
[0mand provide the data to the [33msession[39m option of a subsequent [[33mtls.connect()[39m][][0m
[0mto reuse the session. Servers must[0m
[0mimplement handlers for the [[33m'newSession'[39m][] and [[33m'resumeSession'[39m][] events[0m
[0mto save and restore the session data using the session ID as the lookup key to[0m
[0mreuse sessions. To reuse sessions across load balancers or cluster workers,[0m
[0mservers must use a shared session cache (such as Redis) in their session[0m
[0mhandlers.[0m

[0m[1m[3mSession Tickets[23m[22m The servers encrypt the entire session state and send it[0m
[0mto the client as a "ticket". When reconnecting, the state is sent to the server[0m
[0min the initial connection. This mechanism avoids the need for server-side[0m
[0msession cache. If the server doesn't use the ticket, for any reason (failure[0m
[0mto decrypt it, it's too old, etc.), it will create a new session and send a new[0m
[0mticket. See [RFC 5077][] for more information.[0m

[0mResumption using session tickets is becoming commonly supported by many web[0m
[0mbrowsers when making HTTPS requests.[0m

[0mFor Node.js, clients use the same APIs for resumption with session identifiers[0m
[0mas for resumption with session tickets. For debugging, if[0m
[0m[[33mtls.TLSSocket.getTLSTicket()[39m][] returns a value, the session data contains a[0m
[0mticket, otherwise it contains client-side session state.[0m

[0mWith TLSv1.3, be aware that multiple tickets may be sent by the server,[0m
[0mresulting in multiple [33m'session'[39m events, see [[33m'session'[39m][] for more[0m
[0minformation.[0m

[0mSingle process servers need no specific implementation to use session tickets.[0m
[0mTo use session tickets across server restarts or load balancers, servers must[0m
[0mall have the same ticket keys. There are three 16-byte keys internally, but the[0m
[0mtls API exposes them as a single 48-byte buffer for convenience.[0m

[0mIts possible to get the ticket keys by calling [[33mserver.getTicketKeys()[39m][] on[0m
[0mone server instance and then distribute them, but it is more reasonable to[0m
[0msecurely generate 48 bytes of secure random data and set them with the[0m
[0m[33mticketKeys[39m option of [[33mtls.createServer()[39m][]. The keys should be regularly[0m
[0mregenerated and server's keys can be reset with[0m
[0m[[33mserver.setTicketKeys()[39m][].[0m

[0mSession ticket keys are cryptographic keys, and they [1m[3mmust be stored[23m[22m[0m
[0m[1m[3msecurely[23m[22m. With TLS 1.2 and below, if they are compromised all sessions that[0m
[0mused tickets encrypted with them can be decrypted. They should not be stored[0m
[0mon disk, and they should be regenerated regularly.[0m

[0mIf clients advertise support for tickets, the server will send them. The[0m
[0mserver can disable tickets by supplying[0m
[0m[33mrequire('constants').SSL_OP_NO_TICKET[39m in [33msecureOptions[39m.[0m

[0mBoth session identifiers and session tickets timeout, causing the server to[0m
[0mcreate new sessions. The timeout can be configured with the [33msessionTimeout[39m[0m
[0moption of [[33mtls.createServer()[39m][].[0m

[0mFor all the mechanisms, when resumption fails, servers will create new sessions.[0m
[0mSince failing to resume the session does not cause TLS/HTTPS connection[0m
[0mfailures, it is easy to not notice unnecessarily poor TLS performance. The[0m
[0mOpenSSL CLI can be used to verify that servers are resuming sessions. Use the[0m
[0m[33m-reconnect[39m option to [33mopenssl s_client[39m, for example:[0m

    [33m$ openssl s_client -connect localhost:443 -reconnect[39m

[0mRead through the debug output. The first connection should say "New", for[0m
[0mexample:[0m

    [33mNew, TLSv1.2, Cipher is ECDHE-RSA-AES128-GCM-SHA256[39m

[0mSubsequent connections should say "Reused", for example:[0m

    [33mReused, TLSv1.2, Cipher is ECDHE-RSA-AES128-GCM-SHA256[39m

[32m[1m## Modifying the Default TLS Cipher suite[22m[39m

[0mNode.js is built with a default suite of enabled and disabled TLS ciphers.[0m
[0mCurrently, the default cipher suite is:[0m

    [33mTLS_AES_256_GCM_SHA384:[39m
    [33mTLS_CHACHA20_POLY1305_SHA256:[39m
    [33mTLS_AES_128_GCM_SHA256:[39m
    [33mECDHE-RSA-AES128-GCM-SHA256:[39m
    [33mECDHE-ECDSA-AES128-GCM-SHA256:[39m
    [33mECDHE-RSA-AES256-GCM-SHA384:[39m
    [33mECDHE-ECDSA-AES256-GCM-SHA384:[39m
    [33mDHE-RSA-AES128-GCM-SHA256:[39m
    [33mECDHE-RSA-AES128-SHA256:[39m
    [33mDHE-RSA-AES128-SHA256:[39m
    [33mECDHE-RSA-AES256-SHA384:[39m
    [33mDHE-RSA-AES256-SHA384:[39m
    [33mECDHE-RSA-AES256-SHA256:[39m
    [33mDHE-RSA-AES256-SHA256:[39m
    [33mHIGH:[39m
    [33m!aNULL:[39m
    [33m!eNULL:[39m
    [33m!EXPORT:[39m
    [33m!DES:[39m
    [33m!RC4:[39m
    [33m!MD5:[39m
    [33m!PSK:[39m
    [33m!SRP:[39m
    [33m!CAMELLIA[39m

[0mThis default can be replaced entirely using the [[33m--tls-cipher-list[39m][] command[0m
[0mline switch (directly, or via the [[33mNODE_OPTIONS[39m][] environment variable). For[0m
[0minstance, the following makes [33mECDHE-RSA-AES128-GCM-SHA256:!RC4[39m the default TLS[0m
[0mcipher suite:[0m

    [33mnode --tls-cipher-list="ECDHE-RSA-AES128-GCM-SHA256:!RC4" server.js[39m
    [33m[39m
    [33mexport NODE_OPTIONS=--tls-cipher-list="ECDHE-RSA-AES128-GCM-SHA256:!RC4"[39m
    [33mnode server.js[39m

[0mThe default can also be replaced on a per client or server basis using the[0m
[0m[33mciphers[39m option from [[33mtls.createSecureContext()[39m][], which is also available[0m
[0min [[33mtls.createServer()[39m][], [[33mtls.connect()[39m][], and when creating new[0m
[0m[[33mtls.TLSSocket[39m][]s.[0m

[0mThe ciphers list can contain a mixture of TLSv1.3 cipher suite names, the ones[0m
[0mthat start with [33m'TLS_'[39m, and specifications for TLSv1.2 and below cipher[0m
[0msuites.  The TLSv1.2 ciphers support a legacy specification format, consult[0m
[0mthe OpenSSL [cipher list format][] documentation for details, but those[0m
[0mspecifications do [3mnot[23m apply to TLSv1.3 ciphers.  The TLSv1.3 suites can only[0m
[0mbe enabled by including their full name in the cipher list. They cannot, for[0m
[0mexample, be enabled or disabled by using the legacy TLSv1.2 [33m'EECDH'[39m or[0m
[0m[33m'!EECDH'[39m specification.[0m

[0mDespite the relative order of TLSv1.3 and TLSv1.2 cipher suites, the TLSv1.3[0m
[0mprotocol is significantly more secure than TLSv1.2, and will always be chosen[0m
[0mover TLSv1.2 if the handshake indicates it is supported, and if any TLSv1.3[0m
[0mcipher suites are enabled.[0m

[0mThe default cipher suite included within Node.js has been carefully[0m
[0mselected to reflect current security best practices and risk mitigation.[0m
[0mChanging the default cipher suite can have a significant impact on the security[0m
[0mof an application. The [33m--tls-cipher-list[39m switch and [33mciphers[39m option should by[0m
[0mused only if absolutely necessary.[0m

[0mThe default cipher suite prefers GCM ciphers for [Chrome's 'modern[0m
[0mcryptography' setting][] and also prefers ECDHE and DHE ciphers for Perfect[0m
[0mForward Secrecy, while offering [3msome[23m backward compatibility.[0m

[0m128 bit AES is preferred over 192 and 256 bit AES in light of [specific[0m
[0mattacks affecting larger AES key sizes][].[0m

[0mOld clients that rely on insecure and deprecated RC4 or DES-based ciphers[0m
[0m(like Internet Explorer 6) cannot complete the handshaking process with[0m
[0mthe default configuration. If these clients [3mmust[23m be supported, the[0m
[0m[TLS recommendations][] may offer a compatible cipher suite. For more details[0m
[0mon the format, see the OpenSSL [cipher list format][] documentation.[0m

[0mThere are only 5 TLSv1.3 cipher suites:[0m

    * [0m[33m'TLS_AES_256_GCM_SHA384'[39m[0m
    * [0m[33m'TLS_CHACHA20_POLY1305_SHA256'[39m[0m
    * [0m[33m'TLS_AES_128_GCM_SHA256'[39m[0m
    * [0m[33m'TLS_AES_128_CCM_SHA256'[39m[0m
    * [0m[33m'TLS_AES_128_CCM_8_SHA256'[39m[0m

[0mThe first 3 are enabled by default. The last 2 [33mCCM[39m-based suites are supported[0m
[0mby TLSv1.3 because they may be more performant on constrained systems, but they[0m
[0mare not enabled by default since they offer less security.[0m

[32m[1m## Class: [33mtls.Server[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.2[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends: {net.Server}[0m

[0mAccepts encrypted connections using TLS or SSL.[0m

[32m[1m### Event: [33m'keylog'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mline[39m {Buffer} Line of ASCII text, in NSS [33mSSLKEYLOGFILE[39m format.[0m
    * [0m[33mtlsSocket[39m {tls.TLSSocket} The [33mtls.TLSSocket[39m instance on which it was[0m
      [0mgenerated.[0m

[0mThe [33mkeylog[39m event is emitted when key material is generated or received by[0m
[0ma connection to this server (typically before handshake has completed, but not[0m
[0mnecessarily). This keying material can be stored for debugging, as it allows[0m
[0mcaptured TLS traffic to be decrypted. It may be emitted multiple times for[0m
[0meach socket.[0m

[0mA typical use case is to append received lines to a common text file, which[0m
[0mis later used by software (such as Wireshark) to decrypt the traffic:[0m

    [94mconst[39m [37mlogFile[39m [93m=[39m [37mfs[39m[32m.[39m[37mcreateWriteStream[39m[90m([39m[92m'/tmp/ssl-keys.log'[39m[32m,[39m [33m{[39m [37mflags[39m[93m:[39m [92m'a'[39m [33m}[39m[90m)[39m[90m;[39m
    [90m// ...[39m
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'keylog'[39m[32m,[39m [90m([39m[37mline[39m[32m,[39m [37mtlsSocket[39m[90m)[39m [93m=>[39m [33m{[39m
      [94mif[39m [90m([39m[37mtlsSocket[39m[32m.[39m[37mremoteAddress[39m [93m!==[39m [92m'...'[39m[90m)[39m
        [31mreturn[39m[90m;[39m [90m// Only log keys for a particular IP[39m
      [37mlogFile[39m[32m.[39m[37mwrite[39m[90m([39m[37mline[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### Event: [33m'newSession'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.2[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'newSession'[39m event is emitted upon creation of a new TLS session. This may[0m
[0mbe used to store sessions in external storage. The data should be provided to[0m
[0mthe [[33m'resumeSession'[39m][] callback.[0m

[0mThe listener callback is passed three arguments when called:[0m

    * [0m[33msessionId[39m {Buffer} The TLS session identifier[0m
    * [0m[33msessionData[39m {Buffer} The TLS session data[0m
    * [0m[33mcallback[39m {Function} A callback function taking no arguments that must be[0m
      [0minvoked in order for data to be sent or received over the secure connection.[0m

[0mListening for this event will have an effect only on connections established[0m
[0mafter the addition of the event listener.[0m

[32m[1m### Event: [33m'OCSPRequest'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.13[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'OCSPRequest'[39m event is emitted when the client sends a certificate status[0m
[0mrequest. The listener callback is passed three arguments when called:[0m

    * [0m[33mcertificate[39m {Buffer} The server certificate[0m
    * [0m[33missuer[39m {Buffer} The issuer's certificate[0m
    * [0m[33mcallback[39m {Function} A callback function that must be invoked to provide[0m
      [0mthe results of the OCSP request.[0m

[0mThe server's current certificate can be parsed to obtain the OCSP URL[0m
[0mand certificate ID; after obtaining an OCSP response, [33mcallback(null, resp)[39m is[0m
[0mthen invoked, where [33mresp[39m is a [33mBuffer[39m instance containing the OCSP response.[0m
[0mBoth [33mcertificate[39m and [33missuer[39m are [33mBuffer[39m DER-representations of the[0m
[0mprimary and issuer's certificates. These can be used to obtain the OCSP[0m
[0mcertificate ID and OCSP endpoint URL.[0m

[0mAlternatively, [33mcallback(null, null)[39m may be called, indicating that there was[0m
[0mno OCSP response.[0m

[0mCalling [33mcallback(err)[39m will result in a [33msocket.destroy(err)[39m call.[0m

[0mThe typical flow of an OCSP Request is as follows:[0m

    1. [0mClient connects to the server and sends an [33m'OCSPRequest'[39m (via the status[0m
       [0minfo extension in ClientHello).[0m
    2. [0mServer receives the request and emits the [33m'OCSPRequest'[39m event, calling the[0m
       [0mlistener if registered.[0m
    3. [0mServer extracts the OCSP URL from either the [33mcertificate[39m or [33missuer[39m and[0m
       [0mperforms an [OCSP request][] to the CA.[0m
    4. [0mServer receives [33m'OCSPResponse'[39m from the CA and sends it back to the client[0m
       [0mvia the [33mcallback[39m argument[0m
    5. [0mClient validates the response and either destroys the socket or performs a[0m
       [0mhandshake.[0m

[0mThe [33missuer[39m can be [33mnull[39m if the certificate is either self-signed or the[0m
[0missuer is not in the root certificates list. (An issuer may be provided[0m
[0mvia the [33mca[39m option when establishing the TLS connection.)[0m

[0mListening for this event will have an effect only on connections established[0m
[0mafter the addition of the event listener.[0m

[0mAn npm module like [asn1.js][] may be used to parse the certificates.[0m

[32m[1m### Event: [33m'resumeSession'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.9.2[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'resumeSession'[39m event is emitted when the client requests to resume a[0m
[0mprevious TLS session. The listener callback is passed two arguments when[0m
[0mcalled:[0m

    * [0m[33msessionId[39m {Buffer} The TLS session identifier[0m
    * [0m[33mcallback[39m {Function} A callback function to be called when the prior session[0m
      [0mhas been recovered: [33mcallback([err[, sessionData]])[39m
        * [0m[0m[33merr[39m {Error}[0m[0m[0m
      [0m
        * [0m[0m[33msessionData[39m {Buffer}[0m[0m[0m

[0mThe event listener should perform a lookup in external storage for the[0m
[0m[33msessionData[39m saved by the [[33m'newSession'[39m][] event handler using the given[0m
[0m[33msessionId[39m. If found, call [33mcallback(null, sessionData)[39m to resume the session.[0m
[0mIf not found, the session cannot be resumed. [33mcallback()[39m must be called[0m
[0mwithout [33msessionData[39m so that the handshake can continue and a new session can[0m
[0mbe created. It is possible to call [33mcallback(err)[39m to terminate the incoming[0m
[0mconnection and destroy the socket.[0m

[0mListening for this event will have an effect only on connections established[0m
[0mafter the addition of the event listener.[0m

[0mThe following illustrates resuming a TLS session:[0m

    [94mconst[39m [37mtlsSessionStore[39m [93m=[39m [33m{[39m[33m}[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'newSession'[39m[32m,[39m [90m([39m[37mid[39m[32m,[39m [37mdata[39m[32m,[39m [37mcb[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mtlsSessionStore[39m[33m[[39m[37mid[39m[32m.[39m[37mtoString[39m[90m([39m[92m'hex'[39m[90m)[39m[33m][39m [93m=[39m [37mdata[39m[90m;[39m
      [37mcb[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mon[39m[90m([39m[92m'resumeSession'[39m[32m,[39m [90m([39m[37mid[39m[32m,[39m [37mcb[39m[90m)[39m [93m=>[39m [33m{[39m
      [37mcb[39m[90m([39m[90mnull[39m[32m,[39m [37mtlsSessionStore[39m[33m[[39m[37mid[39m[32m.[39m[37mtoString[39m[90m([39m[92m'hex'[39m[90m)[39m[33m][39m [93m||[39m [90mnull[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### Event: [33m'secureConnection'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.2[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'secureConnection'[39m event is emitted after the handshaking process for a[0m
[0mnew connection has successfully completed. The listener callback is passed a[0m
[0msingle argument when called:[0m

    * [0m[33mtlsSocket[39m {tls.TLSSocket} The established TLS socket.[0m

[0mThe [33mtlsSocket.authorized[39m property is a [33mboolean[39m indicating whether the[0m
[0mclient has been verified by one of the supplied Certificate Authorities for the[0m
[0mserver. If [33mtlsSocket.authorized[39m is [33mfalse[39m, then [33msocket.authorizationError[39m[0m
[0mis set to describe how authorization failed. Depending on the settings[0m
[0mof the TLS server, unauthorized connections may still be accepted.[0m

[0mThe [33mtlsSocket.alpnProtocol[39m property is a string that contains the selected[0m
[0mALPN protocol. When ALPN has no selected protocol, [33mtlsSocket.alpnProtocol[39m[0m
[0mequals [33mfalse[39m.[0m

[0mThe [33mtlsSocket.servername[39m property is a string containing the server name[0m
[0mrequested via SNI.[0m

[32m[1m### Event: [33m'tlsClientError'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v6.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'tlsClientError'[39m event is emitted when an error occurs before a secure[0m
[0mconnection is established. The listener callback is passed two arguments when[0m
[0mcalled:[0m

    * [0m[33mexception[39m {Error} The [33mError[39m object describing the error[0m
    * [0m[33mtlsSocket[39m {tls.TLSSocket} The [33mtls.TLSSocket[39m instance from which the[0m
      [0merror originated.[0m

[32m[1m### [33mserver.addContext(hostname, context)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.3[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhostname[39m {string} A SNI host name or wildcard (e.g. [33m'*'[39m)[0m
    * [0m[33mcontext[39m {Object} An object containing any of the possible properties[0m
      [0mfrom the [[33mtls.createSecureContext()[39m][] [33moptions[39m arguments (e.g. [33mkey[39m,[0m
      [0m[33mcert[39m, [33mca[39m, etc).[0m

[0mThe [33mserver.addContext()[39m method adds a secure context that will be used if[0m
[0mthe client request's SNI name matches the supplied [33mhostname[39m (or wildcard).[0m

[32m[1m### [33mserver.address()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Object}[0m

[0mReturns the bound address, the address family name, and port of the[0m
[0mserver as reported by the operating system. See [[33mnet.Server.address()[39m][] for[0m
[0mmore information.[0m

[32m[1m### [33mserver.close([callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.2[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mcallback[39m {Function} A listener callback that will be registered to listen[0m
      [0mfor the server instance's [33m'close'[39m event.[0m
    * [0mReturns: {tls.Server}[0m

[0mThe [33mserver.close()[39m method stops the server from accepting new connections.[0m

[0mThis function operates asynchronously. The [33m'close'[39m event will be emitted[0m
[0mwhen the server has no more open connections.[0m

[32m[1m### [33mserver.connections[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.2[39m
[90mdeprecated: v0.9.7[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [[33mserver.getConnections()[39m[90m][] instead.[0m[23m[39m

    * [0m{number}[0m

[0mReturns the current number of concurrent connections on the server.[0m

[32m[1m### [33mserver.getTicketKeys()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v3.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Buffer} A 48-byte buffer containing the session ticket keys.[0m

[0mReturns the session ticket keys.[0m

[0mSee [Session Resumption][] for more information.[0m

[32m[1m### [33mserver.listen()[39m[32m[22m[39m

[0mStarts the server listening for encrypted connections.[0m
[0mThis method is identical to [[33mserver.listen()[39m][] from [[33mnet.Server[39m][].[0m

[32m[1m### [33mserver.setSecureContext(options)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object} An object containing any of the possible properties from[0m
      [0mthe [[33mtls.createSecureContext()[39m][] [33moptions[39m arguments (e.g. [33mkey[39m, [33mcert[39m,[0m
      [0m[33mca[39m, etc).[0m

[0mThe [33mserver.setSecureContext()[39m method replaces the secure context of an[0m
[0mexisting server. Existing connections to the server are not interrupted.[0m

[32m[1m### [33mserver.setTicketKeys(keys)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v3.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mkeys[39m {Buffer} A 48-byte buffer containing the session ticket keys.[0m

[0mSets the session ticket keys.[0m

[0mChanges to the ticket keys are effective only for future server connections.[0m
[0mExisting or currently pending server connections will use the previous keys.[0m

[0mSee [Session Resumption][] for more information.[0m

[32m[1m## Class: [33mtls.TLSSocket[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mExtends: {net.Socket}[0m

[0mPerforms transparent encryption of written data and all required TLS[0m
[0mnegotiation.[0m

[0mInstances of [33mtls.TLSSocket[39m implement the duplex [Stream][] interface.[0m

[0mMethods that return TLS connection metadata (e.g.[0m
[0m[[33mtls.TLSSocket.getPeerCertificate()[39m][] will only return data while the[0m
[0mconnection is open.[0m

[32m[1m### [33mnew tls.TLSSocket(socket[, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.4[39m
[90mchanges:[39m
[90m  - version: v12.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/27497[39m
[90m    description: The `enableTrace` option is now supported.[39m
[90m  - version: v5.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2564[39m
[90m    description: ALPN options are supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msocket[39m {net.Socket|stream.Duplex}[0m
      [0mOn the server side, any [33mDuplex[39m stream. On the client side, any[0m
      [0minstance of [[33mnet.Socket[39m][] (for generic [33mDuplex[39m stream support[0m
      [0mon the client side, [[33mtls.connect()[39m][] must be used).[0m
    * [0m[33moptions[39m {Object}
        * [0m[0m[33menableTrace[39m: See [[33mtls.createServer()[39m][][0m[0m[0m
      [0m
        * [0m[0m[33misServer[39m: The SSL/TLS protocol is asymmetrical, TLSSockets must know if[0m[0m[0m
      [0m      [0m[0mthey are to behave as a server or a client. If [33mtrue[39m the TLS socket will be[0m[0m[0m
      [0m      [0m[0minstantiated as a server. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mserver[39m {net.Server} A [[33mnet.Server[39m][] instance.[0m[0m[0m
      [0m
        * [0m[0m[33mrequestCert[39m: Whether to authenticate the remote peer by requesting a[0m[0m[0m
      [0m      [0m[0m certificate. Clients always request a server certificate. Servers[0m[0m[0m
      [0m      [0m[0m ([33misServer[39m is true) may set [33mrequestCert[39m to true to request a client[0m[0m[0m
      [0m      [0m[0m certificate.[0m[0m[0m
      [0m
        * [0m[0m[33mrejectUnauthorized[39m: See [[33mtls.createServer()[39m][][0m[0m[0m
      [0m
        * [0m[0m[33mALPNProtocols[39m: See [[33mtls.createServer()[39m][][0m[0m[0m
      [0m
        * [0m[0m[33mSNICallback[39m: See [[33mtls.createServer()[39m][][0m[0m[0m
      [0m
        * [0m[0m[33msession[39m {Buffer} A [33mBuffer[39m instance containing a TLS session.[0m[0m[0m
      [0m
        * [0m[0m[33mrequestOCSP[39m {boolean} If [33mtrue[39m, specifies that the OCSP status request[0m[0m[0m
      [0m      [0m[0mextension will be added to the client hello and an [33m'OCSPResponse'[39m event[0m[0m[0m
      [0m      [0m[0mwill be emitted on the socket before establishing a secure communication[0m[0m[0m
      [0m
        * [0m[0m[33msecureContext[39m: TLS context object created with[0m[0m[0m
      [0m      [0m[0m[[33mtls.createSecureContext()[39m][]. If a [33msecureContext[39m is [3mnot[23m provided, one[0m[0m[0m
      [0m      [0m[0mwill be created by passing the entire [33moptions[39m object to[0m[0m[0m
      [0m      [0m[0m[33mtls.createSecureContext()[39m.[0m[0m[0m
      [0m
        * [0m[0m...: [[33mtls.createSecureContext()[39m][] options that are used if the[0m[0m[0m
      [0m      [0m[0m[33msecureContext[39m option is missing. Otherwise, they are ignored.[0m[0m[0m

[0mConstruct a new [33mtls.TLSSocket[39m object from an existing TCP socket.[0m

[32m[1m### Event: [33m'keylog'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mline[39m {Buffer} Line of ASCII text, in NSS [33mSSLKEYLOGFILE[39m format.[0m

[0mThe [33mkeylog[39m event is emitted on a client [33mtls.TLSSocket[39m when key material[0m
[0mis generated or received by the socket. This keying material can be stored[0m
[0mfor debugging, as it allows captured TLS traffic to be decrypted. It may[0m
[0mbe emitted multiple times, before or after the handshake completes.[0m

[0mA typical use case is to append received lines to a common text file, which[0m
[0mis later used by software (such as Wireshark) to decrypt the traffic:[0m

    [94mconst[39m [37mlogFile[39m [93m=[39m [37mfs[39m[32m.[39m[37mcreateWriteStream[39m[90m([39m[92m'/tmp/ssl-keys.log'[39m[32m,[39m [33m{[39m [37mflags[39m[93m:[39m [92m'a'[39m [33m}[39m[90m)[39m[90m;[39m
    [90m// ...[39m
    [37mtlsSocket[39m[32m.[39m[37mon[39m[90m([39m[92m'keylog'[39m[32m,[39m [90m([39m[37mline[39m[90m)[39m [93m=>[39m [37mlogFile[39m[32m.[39m[37mwrite[39m[90m([39m[37mline[39m[90m)[39m[90m)[39m[90m;[39m

[32m[1m### Event: [33m'OCSPResponse'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.13[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'OCSPResponse'[39m event is emitted if the [33mrequestOCSP[39m option was set[0m
[0mwhen the [33mtls.TLSSocket[39m was created and an OCSP response has been received.[0m
[0mThe listener callback is passed a single argument when called:[0m

    * [0m[33mresponse[39m {Buffer} The server's OCSP response[0m

[0mTypically, the [33mresponse[39m is a digitally signed object from the server's CA that[0m
[0mcontains information about server's certificate revocation status.[0m

[32m[1m### Event: [33m'secureConnect'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.4[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'secureConnect'[39m event is emitted after the handshaking process for a new[0m
[0mconnection has successfully completed. The listener callback will be called[0m
[0mregardless of whether or not the server's certificate has been authorized. It[0m
[0mis the client's responsibility to check the [33mtlsSocket.authorized[39m property to[0m
[0mdetermine if the server certificate was signed by one of the specified CAs. If[0m
[0m[33mtlsSocket.authorized === false[39m, then the error can be found by examining the[0m
[0m[33mtlsSocket.authorizationError[39m property. If ALPN was used, the[0m
[0m[33mtlsSocket.alpnProtocol[39m property can be checked to determine the negotiated[0m
[0mprotocol.[0m

[32m[1m### Event: [33m'session'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msession[39m {Buffer}[0m

[0mThe [33m'session'[39m event is emitted on a client [33mtls.TLSSocket[39m when a new session[0m
[0mor TLS ticket is available. This may or may not be before the handshake is[0m
[0mcomplete, depending on the TLS protocol version that was negotiated. The event[0m
[0mis not emitted on the server, or if a new session was not created, for example,[0m
[0mwhen the connection was resumed. For some TLS protocol versions the event may be[0m
[0memitted multiple times, in which case all the sessions can be used for[0m
[0mresumption.[0m

[0mOn the client, the [33msession[39m can be provided to the [33msession[39m option of[0m
[0m[[33mtls.connect()[39m][] to resume the connection.[0m

[0mSee [Session Resumption][] for more information.[0m

[0mFor TLSv1.2 and below, [[33mtls.TLSSocket.getSession()[39m][] can be called once[0m
[0mthe handshake is complete.  For TLSv1.3, only ticket-based resumption is allowed[0m
[0mby the protocol, multiple tickets are sent, and the tickets aren't sent until[0m
[0mafter the handshake completes. So it is necessary to wait for the[0m
[0m[33m'session'[39m event to get a resumable session.  Applications[0m
[0mshould use the [33m'session'[39m event instead of [33mgetSession()[39m to ensure[0m
[0mthey will work for all TLS versions.  Applications that only expect to[0m
[0mget or use one session should listen for this event only once:[0m

    [37mtlsSocket[39m[32m.[39m[37monce[39m[90m([39m[92m'session'[39m[32m,[39m [90m([39m[37msession[39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// The session can be used immediately or later.[39m
      [37mtls[39m[32m.[39m[37mconnect[39m[90m([39m[33m{[39m
        [37msession[39m[93m:[39m [37msession[39m[32m,[39m
        [90m// Other connect options...[39m
      [33m}[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m### [33mtlsSocket.address()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Object}[0m

[0mReturns the bound [33maddress[39m, the address [33mfamily[39m name, and [33mport[39m of the[0m
[0munderlying socket as reported by the operating system:[0m
[0m[33m{ port: 12346, family: 'IPv4', address: '127.0.0.1' }[39m.[0m

[32m[1m### [33mtlsSocket.authorizationError[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.4[39m
[90m-->[39m
[90m[39m
[90m[39m[0mReturns the reason why the peer's certificate was not been verified. This[0m
[0mproperty is set only when [33mtlsSocket.authorized === false[39m.[0m

[32m[1m### [33mtlsSocket.authorized[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {boolean}[0m

[0mReturns [33mtrue[39m if the peer certificate was signed by one of the CAs specified[0m
[0mwhen creating the [33mtls.TLSSocket[39m instance, otherwise [33mfalse[39m.[0m

[32m[1m### [33mtlsSocket.disableRenegotiation()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v8.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mDisables TLS renegotiation for this [33mTLSSocket[39m instance. Once called, attempts[0m
[0mto renegotiate will trigger an [33m'error'[39m event on the [33mTLSSocket[39m.[0m

[32m[1m### [33mtlsSocket.enableTrace()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.2.0[39m
[90m-->[39m
[90m[39m
[90m[39m[0mWhen enabled, TLS packet trace information is written to [33mstderr[39m. This can be[0m
[0mused to debug TLS connection problems.[0m

[0mNote: The format of the output is identical to the output of [33mopenssl s_client[39m[0m
[0m[33m-trace[39m or [33mopenssl s_server -trace[39m. While it is produced by OpenSSL's[0m
[0m[33mSSL_trace()[39m function, the format is undocumented, can change without notice,[0m
[0mand should not be relied on.[0m

[32m[1m### [33mtlsSocket.encrypted[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.4[39m
[90m-->[39m
[90m[39m
[90m[39m[0mAlways returns [33mtrue[39m. This may be used to distinguish TLS sockets from regular[0m
[0m[33mnet.Socket[39m instances.[0m

[32m[1m### [33mtlsSocket.getCertificate()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.2.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Object}[0m

[0mReturns an object representing the local certificate. The returned object has[0m
[0msome properties corresponding to the fields of the certificate.[0m

[0mSee [[33mtls.TLSSocket.getPeerCertificate()[39m][] for an example of the certificate[0m
[0mstructure.[0m

[0mIf there is no local certificate, an empty object will be returned. If the[0m
[0msocket has been destroyed, [33mnull[39m will be returned.[0m

[32m[1m### [33mtlsSocket.getCipher()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.4[39m
[90mchanges:[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/26625[39m
[90m    description: Return the minimum cipher version, instead of a fixed string[39m
[90m      (`'TLSv1/SSLv3'`).[39m
[90m  - version: v13.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/30637[39m
[90m    description: Return the IETF cipher name as `standardName`.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Object}
        * [0m[0m[33mname[39m {string} OpenSSL name for the cipher suite.[0m[0m[0m
      [0m
        * [0m[0m[33mstandardName[39m {string} IETF name for the cipher suite.[0m[0m[0m
      [0m
        * [0m[0m[33mversion[39m {string} The minimum TLS protocol version supported by this cipher[0m[0m[0m
      [0m      [0m[0msuite.[0m[0m[0m

[0mReturns an object containing information on the negotiated cipher suite.[0m

[0mFor example:[0m

    [33m{[39m
    [33m    "name": "AES128-SHA256",[39m
    [33m    "standardName": "TLS_RSA_WITH_AES_128_CBC_SHA256",[39m
    [33m    "version": "TLSv1.2"[39m
    [33m}[39m

[0mSee[0m
[0m[34mSSL_CIPHER_get_name ([34m[4mhttps://www.openssl.org/docs/man1.1.1/man3/SSL_CIPHER_get_name.html[24m[39m[34m)[39m[0m
[0mfor more information.[0m

[32m[1m### [33mtlsSocket.getEphemeralKeyInfo()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v5.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Object}[0m

[0mReturns an object representing the type, name, and size of parameter of[0m
[0man ephemeral key exchange in [Perfect Forward Secrecy][] on a client[0m
[0mconnection. It returns an empty object when the key exchange is not[0m
[0mephemeral. As this is only supported on a client socket; [33mnull[39m is returned[0m
[0mif called on a server socket. The supported types are [33m'DH'[39m and [33m'ECDH'[39m. The[0m
[0m[33mname[39m property is available only when type is [33m'ECDH'[39m.[0m

[0mFor example: [33m{ type: 'ECDH', name: 'prime256v1', size: 256 }[39m.[0m

[32m[1m### [33mtlsSocket.getFinished()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.9.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Buffer|undefined} The latest [33mFinished[39m message that has been[0m
      [0msent to the socket as part of a SSL/TLS handshake, or [33mundefined[39m if[0m
      [0mno [33mFinished[39m message has been sent yet.[0m

[0mAs the [33mFinished[39m messages are message digests of the complete handshake[0m
[0m(with a total of 192 bits for TLS 1.0 and more for SSL 3.0), they can[0m
[0mbe used for external authentication procedures when the authentication[0m
[0mprovided by SSL/TLS is not desired or is not enough.[0m

[0mCorresponds to the [33mSSL_get_finished[39m routine in OpenSSL and may be used[0m
[0mto implement the [33mtls-unique[39m channel binding from [RFC 5929][].[0m

[32m[1m### [33mtlsSocket.getPeerCertificate([detailed])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mdetailed[39m {boolean} Include the full certificate chain if [33mtrue[39m, otherwise[0m
      [0minclude just the peer's certificate.[0m
    * [0mReturns: {Object} A certificate object.[0m

[0mReturns an object representing the peer's certificate. If the peer does not[0m
[0mprovide a certificate, an empty object will be returned. If the socket has been[0m
[0mdestroyed, [33mnull[39m will be returned.[0m

[0mIf the full certificate chain was requested, each certificate will include an[0m
[0m[33missuerCertificate[39m property containing an object representing its issuer's[0m
[0mcertificate.[0m

[32m[1m#### Certificate Object[22m[39m

[90m<!-- YAML[39m
[90mchanges:[39m
[90m  - version: v11.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/24358[39m
[90m    description: Support Elliptic Curve public key info.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mA certificate object has properties corresponding to the fields of the[0m
[0mcertificate.[0m

    * [0m[33mraw[39m {Buffer} The DER encoded X.509 certificate data.[0m
    * [0m[33msubject[39m {Object} The certificate subject, described in terms of[0m
      [0m Country ([33mC:[39m), StateOrProvince ([33mST[39m), Locality ([33mL[39m), Organization ([33mO[39m),[0m
      [0m OrganizationalUnit ([33mOU[39m), and CommonName ([33mCN[39m). The CommonName is typically[0m
      [0m a DNS name with TLS certificates. Example:[0m
      [0m [33m{C: 'UK', ST: 'BC', L: 'Metro', O: 'Node Fans', OU: 'Docs', CN: 'example.com'}[39m.[0m
    * [0m[33missuer[39m {Object} The certificate issuer, described in the same terms as the[0m
      [0m [33msubject[39m.[0m
    * [0m[33mvalid_from[39m {string} The date-time the certificate is valid from.[0m
    * [0m[33mvalid_to[39m {string} The date-time the certificate is valid to.[0m
    * [0m[33mserialNumber[39m {string} The certificate serial number, as a hex string.[0m
      [0m Example: [33m'B9B0D332A1AA5635'[39m.[0m
    * [0m[33mfingerprint[39m {string} The SHA-1 digest of the DER encoded certificate. It is[0m
      [0mreturned as a [33m:[39m separated hexadecimal string. Example: [33m'2A:7A:C2:DD:...'[39m.[0m
    * [0m[33mfingerprint256[39m {string} The SHA-256 digest of the DER encoded certificate.[0m
      [0m It is returned as a [33m:[39m separated hexadecimal string. Example:[0m
      [0m [33m'2A:7A:C2:DD:...'[39m.[0m
    * [0m[33mext_key_usage[39m {Array} (Optional) The extended key usage, a set of OIDs.[0m
    * [0m[33msubjectaltname[39m {string} (Optional) A string containing concatenated names[0m
      [0mfor the subject, an alternative to the [33msubject[39m names.[0m
    * [0m[33minfoAccess[39m {Array} (Optional) An array describing the AuthorityInfoAccess,[0m
      [0m used with OCSP.[0m
    * [0m[33missuerCertificate[39m {Object} (Optional) The issuer certificate object. For[0m
      [0m self-signed certificates, this may be a circular reference.[0m

[0mThe certificate may contain information about the public key, depending on[0m
[0mthe key type.[0m

[0mFor RSA keys, the following properties may be defined:[0m

    * [0m[33mbits[39m {number} The RSA bit size. Example: [33m1024[39m.[0m
    * [0m[33mexponent[39m {string} The RSA exponent, as a string in hexadecimal number[0m
      [0mnotation. Example: [33m'0x010001'[39m.[0m
    * [0m[33mmodulus[39m {string} The RSA modulus, as a hexadecimal string. Example:[0m
      [0m [33m'B56CE45CB7...'[39m.[0m
    * [0m[33mpubkey[39m {Buffer} The public key.[0m

[0mFor EC keys, the following properties may be defined:[0m

    * [0m[33mpubkey[39m {Buffer} The public key.[0m
    * [0m[33mbits[39m {number} The key size in bits. Example: [33m256[39m.[0m
    * [0m[33masn1Curve[39m {string} (Optional) The ASN.1 name of the OID of the elliptic[0m
      [0mcurve. Well-known curves are identified by an OID. While it is unusual, it is[0m
      [0mpossible that the curve is identified by its mathematical properties, in which[0m
      [0mcase it will not have an OID. Example: [33m'prime256v1'[39m.[0m
    * [0m[33mnistCurve[39m {string} (Optional) The NIST name for the elliptic curve, if it[0m
      [0mhas one (not all well-known curves have been assigned names by NIST). Example:[0m
      [0m[33m'P-256'[39m.[0m

[0mExample certificate:[0m

    [33m{ subject:[39m
    [33m   { OU: [ 'Domain Control Validated', 'PositiveSSL Wildcard' ],[39m
    [33m     CN: '*.nodejs.org' },[39m
    [33m  issuer:[39m
    [33m   { C: 'GB',[39m
    [33m     ST: 'Greater Manchester',[39m
    [33m     L: 'Salford',[39m
    [33m     O: 'COMODO CA Limited',[39m
    [33m     CN: 'COMODO RSA Domain Validation Secure Server CA' },[39m
    [33m  subjectaltname: 'DNS:*.nodejs.org, DNS:nodejs.org',[39m
    [33m  infoAccess:[39m
    [33m   { 'CA Issuers - URI':[39m
    [33m      [ 'http://crt.comodoca.com/COMODORSADomainValidationSecureServerCA.crt' ],[39m
    [33m     'OCSP - URI': [ 'http://ocsp.comodoca.com' ] },[39m
    [33m  modulus: 'B56CE45CB740B09A13F64AC543B712FF9EE8E4C284B542A1708A27E82A8D151CA178153E12E6DDA15BF70FFD96CB8A88618641BDFCCA03527E665B70D779C8A349A6F88FD4EF6557180BD4C98192872BCFE3AF56E863C09DDD8BC1EC58DF9D94F914F0369102B2870BECFA1348A0838C9C49BD1C20124B442477572347047506B1FCD658A80D0C44BCC16BC5C5496CFE6E4A8428EF654CD3D8972BF6E5BFAD59C93006830B5EB1056BBB38B53D1464FA6E02BFDF2FF66CD949486F0775EC43034EC2602AEFBF1703AD221DAA2A88353C3B6A688EFE8387811F645CEED7B3FE46E1F8B9F59FAD028F349B9BC14211D5830994D055EEA3D547911E07A0ADDEB8A82B9188E58720D95CD478EEC9AF1F17BE8141BE80906F1A339445A7EB5B285F68039B0F294598A7D1C0005FC22B5271B0752F58CCDEF8C8FD856FB7AE21C80B8A2CE983AE94046E53EDE4CB89F42502D31B5360771C01C80155918637490550E3F555E2EE75CC8C636DDE3633CFEDD62E91BF0F7688273694EEEBA20C2FC9F14A2A435517BC1D7373922463409AB603295CEB0BB53787A334C9CA3CA8B30005C5A62FC0715083462E00719A8FA3ED0A9828C3871360A73F8B04A4FC1E71302844E9BB9940B77E745C9D91F226D71AFCAD4B113AAF68D92B24DDB4A2136B55A1CD1ADF39605B63CB639038ED0F4C987689866743A68769CC55847E4A06D6E2E3F1',[39m
    [33m  exponent: '0x10001',[39m
    [33m  pubkey: <Buffer ... >,[39m
    [33m  valid_from: 'Aug 14 00:00:00 2017 GMT',[39m
    [33m  valid_to: 'Nov 20 23:59:59 2019 GMT',[39m
    [33m  fingerprint: '01:02:59:D9:C3:D2:0D:08:F7:82:4E:44:A4:B4:53:C5:E2:3A:87:4D',[39m
    [33m  fingerprint256: '69:AE:1A:6A:D4:3D:C6:C1:1B:EA:C6:23:DE:BA:2A:14:62:62:93:5C:7A:EA:06:41:9B:0B:BC:87:CE:48:4E:02',[39m
    [33m  ext_key_usage: [ '1.3.6.1.5.5.7.3.1', '1.3.6.1.5.5.7.3.2' ],[39m
    [33m  serialNumber: '66593D57F20CBC573E433381B5FEC280',[39m
    [33m  raw: <Buffer ... > }[39m

[32m[1m### [33mtlsSocket.getPeerFinished()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v9.9.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Buffer|undefined} The latest [33mFinished[39m message that is expected[0m
      [0mor has actually been received from the socket as part of a SSL/TLS handshake,[0m
      [0mor [33mundefined[39m if there is no [33mFinished[39m message so far.[0m

[0mAs the [33mFinished[39m messages are message digests of the complete handshake[0m
[0m(with a total of 192 bits for TLS 1.0 and more for SSL 3.0), they can[0m
[0mbe used for external authentication procedures when the authentication[0m
[0mprovided by SSL/TLS is not desired or is not enough.[0m

[0mCorresponds to the [33mSSL_get_peer_finished[39m routine in OpenSSL and may be used[0m
[0mto implement the [33mtls-unique[39m channel binding from [RFC 5929][].[0m

[32m[1m### [33mtlsSocket.getProtocol()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v5.7.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {string|null}[0m

[0mReturns a string containing the negotiated SSL/TLS protocol version of the[0m
[0mcurrent connection. The value [33m'unknown'[39m will be returned for connected[0m
[0msockets that have not completed the handshaking process. The value [33mnull[39m will[0m
[0mbe returned for server sockets or disconnected client sockets.[0m

[0mProtocol versions are:[0m

    * [0m[33m'SSLv3'[39m[0m
    * [0m[33m'TLSv1'[39m[0m
    * [0m[33m'TLSv1.1'[39m[0m
    * [0m[33m'TLSv1.2'[39m[0m
    * [0m[33m'TLSv1.3'[39m[0m

[0mSee the OpenSSL [[33mSSL_get_version[39m][] documentation for more information.[0m

[32m[1m### [33mtlsSocket.getSession()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Buffer}[0m

[0mReturns the TLS session data or [33mundefined[39m if no session was[0m
[0mnegotiated. On the client, the data can be provided to the [33msession[39m option of[0m
[0m[[33mtls.connect()[39m][] to resume the connection. On the server, it may be useful[0m
[0mfor debugging.[0m

[0mSee [Session Resumption][] for more information.[0m

[0mNote: [33mgetSession()[39m works only for TLSv1.2 and below. For TLSv1.3, applications[0m
[0mmust use the [[33m'session'[39m][] event (it also works for TLSv1.2 and below).[0m

[32m[1m### [33mtlsSocket.getSharedSigalgs()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.11.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {Array} List of signature algorithms shared between the server and[0m
      [0mthe client in the order of decreasing preference.[0m

[0mSee[0m
[0m[34mSSL_get_shared_sigalgs ([34m[4mhttps://www.openssl.org/docs/man1.1.1/man3/SSL_get_shared_sigalgs.html[24m[39m[34m)[39m[0m
[0mfor more information.[0m

[32m[1m### [33mtlsSocket.exportKeyingMaterial(length, label[, context])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.10.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[0m[0m[33mlength[39m {number} number of bytes to retrieve from keying material[0m[0m[0m
    * [0m[0m[0m[33mlabel[39m {string} an application specific label, typically this will be a[0m[0m[0m
      [0m[0m[0mvalue from the[0m[0m[0m
      [0m[0m[0m[34mIANA Exporter Label Registry ([34m[4mhttps://www.iana.org/assignments/tls-parameters/tls-parameters.xhtml#exporter-labels[24m[39m[34m)[39m.[0m[0m[0m
    * [0m[0m[0m[33mcontext[39m {Buffer} Optionally provide a context.[0m[0m[0m
    * [0m[0m[0mReturns: {Buffer} requested bytes of the keying material[0m[0m[0m

[0mKeying material is used for validations to prevent different kind of attacks in[0m
[0mnetwork protocols, for example in the specifications of IEEE 802.1X.[0m

[0mExample[0m

    [94mconst[39m [37mkeyingMaterial[39m [93m=[39m [37mtlsSocket[39m[32m.[39m[37mexportKeyingMaterial[39m[90m([39m
      [34m128[39m[32m,[39m
      [92m'client finished'[39m[90m)[39m[90m;[39m
    
    [90m/**
     Example return value of keyingMaterial:
     <Buffer 76 26 af 99 c5 56 8e 42 09 91 ef 9f 93 cb ad 6c 7b 65 f8 53 f1 d8 d9
        12 5a 33 b8 b5 25 df 7b 37 9f e0 e2 4f b8 67 83 a3 2f cd 5d 41 42 4c 91
        74 ef 2c ... 78 more bytes>
    */[39m

[0mSee the OpenSSL [[33mSSL_export_keying_material[39m][] documentation for more[0m
[0minformation.[0m

[32m[1m### [33mtlsSocket.getTLSTicket()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{Buffer}[0m

[0mFor a client, returns the TLS session ticket if one is available, or[0m
[0m[33mundefined[39m. For a server, always returns [33mundefined[39m.[0m

[0mIt may be useful for debugging.[0m

[0mSee [Session Resumption][] for more information.[0m

[32m[1m### [33mtlsSocket.isSessionReused()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.6[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {boolean} [33mtrue[39m if the session was reused, [33mfalse[39m otherwise.[0m

[0mSee [Session Resumption][] for more information.[0m

[32m[1m### [33mtlsSocket.localAddress[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mReturns the string representation of the local IP address.[0m

[32m[1m### [33mtlsSocket.localPort[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mReturns the numeric representation of the local port.[0m

[32m[1m### [33mtlsSocket.remoteAddress[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mReturns the string representation of the remote IP address. For example,[0m
[0m[33m'74.125.127.100'[39m or [33m'2001:4860:a005::68'[39m.[0m

[32m[1m### [33mtlsSocket.remoteFamily[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string}[0m

[0mReturns the string representation of the remote IP family. [33m'IPv4'[39m or [33m'IPv6'[39m.[0m

[32m[1m### [33mtlsSocket.remotePort[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{number}[0m

[0mReturns the numeric representation of the remote port. For example, [33m443[39m.[0m

[32m[1m### [33mtlsSocket.renegotiate(options, callback)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.8[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[0m[0m[33moptions[39m {Object}[0m[0m[0m
      [0m[0m
      [0m
        * [0m[0m[33mrejectUnauthorized[39m {boolean} If not [33mfalse[39m, the server certificate is[0m[0m[0m
      [0m      [0m[0mverified against the list of supplied CAs. An [33m'error'[39m event is emitted if[0m[0m[0m
      [0m      [0m[0mverification fails; [33merr.code[39m contains the OpenSSL error code. [1mDefault:[22m[0m[0m[0m
      [0m      [0m[0m[33mtrue[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mrequestCert[39m[0m[0m[0m
    * [0m[0m[0m[33mcallback[39m {Function} If [33mrenegotiate()[39m returned [33mtrue[39m, callback is[0m[0m[0m
      [0m[0m[0m attached once to the [33m'secure'[39m event. If [33mrenegotiate()[39m returned [33mfalse[39m,[0m[0m[0m
      [0m[0m[0m [33mcallback[39m will be called in the next tick with an error, unless the[0m[0m[0m
      [0m[0m[0m [33mtlsSocket[39m has been destroyed, in which case [33mcallback[39m will not be called[0m[0m[0m
      [0m[0m[0m at all.[0m[0m[0m
    * [0m[0m[0mReturns: {boolean} [33mtrue[39m if renegotiation was initiated, [33mfalse[39m otherwise.[0m[0m[0m

[0mThe [33mtlsSocket.renegotiate()[39m method initiates a TLS renegotiation process.[0m
[0mUpon completion, the [33mcallback[39m function will be passed a single argument[0m
[0mthat is either an [33mError[39m (if the request failed) or [33mnull[39m.[0m

[0mThis method can be used to request a peer's certificate after the secure[0m
[0mconnection has been established.[0m

[0mWhen running as the server, the socket will be destroyed with an error after[0m
[0m[33mhandshakeTimeout[39m timeout.[0m

[0mFor TLSv1.3, renegotiation cannot be initiated, it is not supported by the[0m
[0mprotocol.[0m

[32m[1m### [33mtlsSocket.setMaxSendFragment(size)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.11[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33msize[39m {number} The maximum TLS fragment size. The maximum value is [33m16384[39m.[0m
      [0m[1mDefault:[22m [33m16384[39m.[0m
    * [0mReturns: {boolean}[0m

[0mThe [33mtlsSocket.setMaxSendFragment()[39m method sets the maximum TLS fragment size.[0m
[0mReturns [33mtrue[39m if setting the limit succeeded; [33mfalse[39m otherwise.[0m

[0mSmaller fragment sizes decrease the buffering latency on the client: larger[0m
[0mfragments are buffered by the TLS layer until the entire fragment is received[0m
[0mand its integrity is verified; large fragments can span multiple roundtrips[0m
[0mand their processing can be delayed due to packet loss or reordering. However,[0m
[0msmaller fragments add extra TLS framing bytes and CPU overhead, which may[0m
[0mdecrease overall server throughput.[0m

[32m[1m## [33mtls.checkServerIdentity(hostname, cert)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.8.4[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mhostname[39m {string} The host name or IP address to verify the certificate[0m
      [0magainst.[0m
    * [0m[33mcert[39m {Object} A [certificate object][] representing the peer's certificate.[0m
    * [0mReturns: {Error|undefined}[0m

[0mVerifies the certificate [33mcert[39m is issued to [33mhostname[39m.[0m

[0mReturns {Error} object, populating it with [33mreason[39m, [33mhost[39m, and [33mcert[39m on[0m
[0mfailure. On success, returns {undefined}.[0m

[0mThis function can be overwritten by providing alternative function as part of[0m
[0mthe [33moptions.checkServerIdentity[39m option passed to [33mtls.connect()[39m. The[0m
[0moverwriting function can call [33mtls.checkServerIdentity()[39m of course, to augment[0m
[0mthe checks done with additional verification.[0m

[0mThis function is only called if the certificate passed all other checks, such as[0m
[0mbeing issued by trusted CA ([33moptions.ca[39m).[0m

[32m[1m## [33mtls.connect(options[, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.3[39m
[90mchanges:[39m
[90m  - version: v13.6.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/23188[39m
[90m    description: The `pskCallback` option is now supported.[39m
[90m  - version: v12.9.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/27836[39m
[90m    description: Support the `allowHalfOpen` option.[39m
[90m  - version: v12.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/27816[39m
[90m    description: The `hints` option is now supported.[39m
[90m  - version: v12.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/27497[39m
[90m    description: The `enableTrace` option is now supported.[39m
[90m  - version: v11.8.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/25517[39m
[90m    description: The `timeout` option is supported now.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12839[39m
[90m    description: The `lookup` option is supported now.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/11984[39m
[90m    description: The `ALPNProtocols` option can be a `TypedArray` or[39m
[90m     `DataView` now.[39m
[90m  - version: v5.3.0, v4.7.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/4246[39m
[90m    description: The `secureContext` option is supported now.[39m
[90m  - version: v5.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2564[39m
[90m    description: ALPN options are supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object}
        * [0m[0m[33menableTrace[39m: See [[33mtls.createServer()[39m][][0m[0m[0m
      [0m
        * [0m[0m[33mhost[39m {string} Host the client should connect to. [1mDefault:[22m[0m[0m[0m
      [0m      [0m[0m[33m'localhost'[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mport[39m {number} Port the client should connect to.[0m[0m[0m
      [0m
        * [0m[0m[33mpath[39m {string} Creates Unix socket connection to path. If this option is[0m[0m[0m
      [0m      [0m[0mspecified, [33mhost[39m and [33mport[39m are ignored.[0m[0m[0m
      [0m
        * [0m[0m[33msocket[39m {stream.Duplex} Establish secure connection on a given socket[0m[0m[0m
      [0m      [0m[0mrather than creating a new socket. Typically, this is an instance of[0m[0m[0m
      [0m      [0m[0m[[33mnet.Socket[39m][], but any [33mDuplex[39m stream is allowed.[0m[0m[0m
      [0m      [0m[0mIf this option is specified, [33mpath[39m, [33mhost[39m and [33mport[39m are ignored,[0m[0m[0m
      [0m      [0m[0mexcept for certificate validation. Usually, a socket is already connected[0m[0m[0m
      [0m      [0m[0mwhen passed to [33mtls.connect()[39m, but it can be connected later.[0m[0m[0m
      [0m      [0m[0mConnection/disconnection/destruction of [33msocket[39m is the user's[0m[0m[0m
      [0m      [0m[0mresponsibility; calling [33mtls.connect()[39m will not cause [33mnet.connect()[39m to be[0m[0m[0m
      [0m      [0m[0mcalled.[0m[0m[0m
      [0m
        * [0m[0m[33mallowHalfOpen[39m {boolean} If the [33msocket[39m option is missing, indicates[0m[0m[0m
      [0m      [0m[0mwhether or not to allow the internally created socket to be half-open,[0m[0m[0m
      [0m      [0m[0motherwise the option is ignored. See the [33mallowHalfOpen[39m option of[0m[0m[0m
      [0m      [0m[0m[[33mnet.Socket[39m][] for details. [1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mrejectUnauthorized[39m {boolean} If not [33mfalse[39m, the server certificate is[0m[0m[0m
      [0m      [0m[0mverified against the list of supplied CAs. An [33m'error'[39m event is emitted if[0m[0m[0m
      [0m      [0m[0mverification fails; [33merr.code[39m contains the OpenSSL error code. [1mDefault:[22m[0m[0m[0m
      [0m      [0m[0m[33mtrue[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mpskCallback[39m {Function}[0m
      [0m
            * [0m[0m[0m[0mhint: {string} optional message sent from the server to help client[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mdecide which identity to use during negotiation.[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mAlways [33mnull[39m if TLS 1.3 is used.[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m[0m
      [0m
            * [0m[0m[0m[0mReturns: {Object} in the form[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0m[33m{ psk: <Buffer|TypedArray|DataView>, identity: <string> }[39m[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mor [33mnull[39m to stop the negotiation process. [33mpsk[39m must be[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mcompatible with the selected cipher's digest.[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0m[33midentity[39m must use UTF-8 encoding.[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mWhen negotiating TLS-PSK (pre-shared keys), this function is called[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mwith optional identity [33mhint[39m provided by the server or [33mnull[39m[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0min case of TLS 1.3 where [33mhint[39m was removed.[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mIt will be necessary to provide a custom [33mtls.checkServerIdentity()[39m[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mfor the connection as the default one will try to check host name/IP[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mof the server against the certificate but that's not applicable for PSK[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mbecause there won't be a certificate present.[0m[0m[0m[0m[0m[0m[0m
      [0m      [0m[0m      [0m[0m[0m[0mMore information can be found in the [RFC 4279][].[0m[0m[0m[0m[0m[0m[0m
      [0m
        * [0m[0m[33mALPNProtocols[39m: {string[]|Buffer[]|TypedArray[]|DataView[]|Buffer|[0m[0m[0m
      [0m      [0m[0mTypedArray|DataView}[0m[0m[0m
      [0m      [0m[0mAn array of strings, [33mBuffer[39ms or [33mTypedArray[39ms or [33mDataView[39ms, or a[0m[0m[0m
      [0m      [0m[0msingle [33mBuffer[39m or [33mTypedArray[39m or [33mDataView[39m containing the supported ALPN[0m[0m[0m
      [0m      [0m[0mprotocols. [33mBuffer[39ms should have the format [33m[len][name][len][name]...[39m[0m[0m[0m
      [0m      [0m[0me.g. [33m'\x08http/1.1\x08http/1.0'[39m, where the [33mlen[39m byte is the length of the[0m[0m[0m
      [0m      [0m[0mnext protocol name. Passing an array is usually much simpler, e.g.[0m[0m[0m
      [0m      [0m[0m[33m['http/1.1', 'http/1.0'][39m. Protocols earlier in the list have higher[0m[0m[0m
      [0m      [0m[0mpreference than those later.[0m[0m[0m
      [0m
        * [0m[0m[33mservername[39m: {string} Server name for the SNI (Server Name Indication) TLS[0m[0m[0m
      [0m      [0m[0mextension. It is the name of the host being connected to, and must be a host[0m[0m[0m
      [0m      [0m[0mname, and not an IP address. It can be used by a multi-homed server to[0m[0m[0m
      [0m      [0m[0mchoose the correct certificate to present to the client, see the[0m[0m[0m
      [0m      [0m[0m[33mSNICallback[39m option to [[33mtls.createServer()[39m][].[0m[0m[0m
      [0m
        * [0m[0m[33mcheckServerIdentity(servername, cert)[39m {Function} A callback function[0m[0m[0m
      [0m      [0m[0mto be used (instead of the builtin [33mtls.checkServerIdentity()[39m function)[0m[0m[0m
      [0m      [0m[0mwhen checking the server's host name (or the provided [33mservername[39m when[0m[0m[0m
      [0m      [0m[0mexplicitly set) against the certificate. This should return an {Error} if[0m[0m[0m
      [0m      [0m[0mverification fails. The method should return [33mundefined[39m if the [33mservername[39m[0m[0m[0m
      [0m      [0m[0mand [33mcert[39m are verified.[0m[0m[0m
      [0m
        * [0m[0m[33msession[39m {Buffer} A [33mBuffer[39m instance, containing TLS session.[0m[0m[0m
      [0m
        * [0m[0m[33mminDHSize[39m {number} Minimum size of the DH parameter in bits to accept a[0m[0m[0m
      [0m      [0m[0mTLS connection. When a server offers a DH parameter with a size less[0m[0m[0m
      [0m      [0m[0mthan [33mminDHSize[39m, the TLS connection is destroyed and an error is thrown.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33m1024[39m.[0m[0m[0m
      [0m
        * [0m[0m[33msecureContext[39m: TLS context object created with[0m[0m[0m
      [0m      [0m[0m[[33mtls.createSecureContext()[39m][]. If a [33msecureContext[39m is [3mnot[23m provided, one[0m[0m[0m
      [0m      [0m[0mwill be created by passing the entire [33moptions[39m object to[0m[0m[0m
      [0m      [0m[0m[33mtls.createSecureContext()[39m.[0m[0m[0m
      [0m
        * [0m[0m...: [[33mtls.createSecureContext()[39m][] options that are used if the[0m[0m[0m
      [0m      [0m[0m[33msecureContext[39m option is missing, otherwise they are ignored.[0m[0m[0m
      [0m
        * [0m[0m...: Any [[33msocket.connect()[39m][] option not already listed.[0m[0m[0m
    * [0m[33mcallback[39m {Function}[0m
    * [0mReturns: {tls.TLSSocket}[0m

[0mThe [33mcallback[39m function, if specified, will be added as a listener for the[0m
[0m[[33m'secureConnect'[39m][] event.[0m

[0m[33mtls.connect()[39m returns a [[33mtls.TLSSocket[39m][] object.[0m

[0mThe following illustrates a client for the echo server example from[0m
[0m[[33mtls.createServer()[39m][]:[0m

    [90m// Assumes an echo server that is listening on port 8000.[39m
    [94mconst[39m [37mtls[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/tls'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37moptions[39m [93m=[39m [33m{[39m
      [90m// Necessary only if the server requires client certificate authentication.[39m
      [37mkey[39m[93m:[39m [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'client-key.pem'[39m[90m)[39m[32m,[39m
      [37mcert[39m[93m:[39m [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'client-cert.pem'[39m[90m)[39m[32m,[39m
    
      [90m// Necessary only if the server uses a self-signed certificate.[39m
      [37mca[39m[93m:[39m [33m[[39m [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'server-cert.pem'[39m[90m)[39m [33m][39m[32m,[39m
    
      [90m// Necessary only if the server's cert isn't for "localhost".[39m
      [37mcheckServerIdentity[39m[93m:[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m [31mreturn[39m [90mnull[39m[90m;[39m [33m}[39m[32m,[39m
    [33m}[39m[90m;[39m
    
    [94mconst[39m [37msocket[39m [93m=[39m [37mtls[39m[32m.[39m[37mconnect[39m[90m([39m[34m8000[39m[32m,[39m [37moptions[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'client connected'[39m[32m,[39m
                  [37msocket[39m[32m.[39m[37mauthorized[39m [93m?[39m [32m'authorized'[39m [93m:[39m [92m'unauthorized'[39m[90m)[39m[90m;[39m
      [37mprocess[39m[32m.[39m[37mstdin[39m[32m.[39m[37mpipe[39m[90m([39m[37msocket[39m[90m)[39m[90m;[39m
      [37mprocess[39m[32m.[39m[37mstdin[39m[32m.[39m[37mresume[39m[90m([39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37msocket[39m[32m.[39m[37msetEncoding[39m[90m([39m[92m'utf8'[39m[90m)[39m[90m;[39m
    [37msocket[39m[32m.[39m[37mon[39m[90m([39m[92m'data'[39m[32m,[39m [90m([39m[37mdata[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mdata[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37msocket[39m[32m.[39m[37mon[39m[90m([39m[92m'end'[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'server ends connection'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[32m[1m## [33mtls.connect(path[, options][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.3[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mpath[39m {string} Default value for [33moptions.path[39m.[0m
    * [0m[33moptions[39m {Object} See [[33mtls.connect()[39m][].[0m
    * [0m[33mcallback[39m {Function} See [[33mtls.connect()[39m][].[0m
    * [0mReturns: {tls.TLSSocket}[0m

[0mSame as [[33mtls.connect()[39m][] except that [33mpath[39m can be provided[0m
[0mas an argument instead of an option.[0m

[0mA path option, if specified, will take precedence over the path argument.[0m

[32m[1m## [33mtls.connect(port[, host][, options][, callback])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.3[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mport[39m {number} Default value for [33moptions.port[39m.[0m
    * [0m[33mhost[39m {string} Default value for [33moptions.host[39m.[0m
    * [0m[33moptions[39m {Object} See [[33mtls.connect()[39m][].[0m
    * [0m[33mcallback[39m {Function} See [[33mtls.connect()[39m][].[0m
    * [0mReturns: {tls.TLSSocket}[0m

[0mSame as [[33mtls.connect()[39m][] except that [33mport[39m and [33mhost[39m can be provided[0m
[0mas arguments instead of options.[0m

[0mA port or host option, if specified, will take precedence over any port or host[0m
[0margument.[0m

[32m[1m## [33mtls.createSecureContext([options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.13[39m
[90mchanges:[39m
[90m  - version: v12.12.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/28973[39m
[90m    description: Added `privateKeyIdentifier` and `privateKeyEngine` options[39m
[90m                 to get private key from an OpenSSL engine.[39m
[90m  - version: v12.11.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/29598[39m
[90m    description: Added `sigalgs` option to override supported signature[39m
[90m                 algorithms.[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/26209[39m
[90m    description: TLSv1.3 support added.[39m
[90m  - version: v11.5.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/24733[39m
[90m    description: The `ca:` option now supports `BEGIN TRUSTED CERTIFICATE`.[39m
[90m  - version: v11.4.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/24405[39m
[90m    description: The `minVersion` and `maxVersion` can be used to restrict[39m
[90m                 the allowed TLS protocol versions.[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/19794[39m
[90m    description: The `ecdhCurve` cannot be set to `false` anymore due to a[39m
[90m                 change in OpenSSL.[39m
[90m  - version: v9.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/14903[39m
[90m    description: The `options` parameter can now include `clientCertEngine`.[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/15206[39m
[90m    description: The `ecdhCurve` option can now be multiple `':'` separated[39m
[90m                 curve names or `'auto'`.[39m
[90m  - version: v7.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/10294[39m
[90m    description: If the `key` option is an array, individual entries do not[39m
[90m                 need a `passphrase` property anymore. `Array` entries can also[39m
[90m                 just be `string`s or `Buffer`s now.[39m
[90m  - version: v5.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/4099[39m
[90m    description: The `ca` option can now be a single string containing multiple[39m
[90m                 CA certificates.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object}
        * [0m[0m[33mca[39m {string|string[]|Buffer|Buffer[]} Optionally override the trusted CA[0m[0m[0m
      [0m      [0m[0mcertificates. Default is to trust the well-known CAs curated by Mozilla.[0m[0m[0m
      [0m      [0m[0mMozilla's CAs are completely replaced when CAs are explicitly specified[0m[0m[0m
      [0m      [0m[0musing this option. The value can be a string or [33mBuffer[39m, or an [33mArray[39m of[0m[0m[0m
      [0m      [0m[0mstrings and/or [33mBuffer[39ms. Any string or [33mBuffer[39m can contain multiple PEM[0m[0m[0m
      [0m      [0m[0mCAs concatenated together. The peer's certificate must be chainable to a CA[0m[0m[0m
      [0m      [0m[0mtrusted by the server for the connection to be authenticated. When using[0m[0m[0m
      [0m      [0m[0mcertificates that are not chainable to a well-known CA, the certificate's CA[0m[0m[0m
      [0m      [0m[0mmust be explicitly specified as a trusted or the connection will fail to[0m[0m[0m
      [0m      [0m[0mauthenticate.[0m[0m[0m
      [0m      [0m[0mIf the peer uses a certificate that doesn't match or chain to one of the[0m[0m[0m
      [0m      [0m[0mdefault CAs, use the [33mca[39m option to provide a CA certificate that the peer's[0m[0m[0m
      [0m      [0m[0mcertificate can match or chain to.[0m[0m[0m
      [0m      [0m[0mFor self-signed certificates, the certificate is its own CA, and must be[0m[0m[0m
      [0m      [0m[0mprovided.[0m[0m[0m
      [0m      [0m[0mFor PEM encoded certificates, supported types are "TRUSTED CERTIFICATE",[0m[0m[0m
      [0m      [0m[0m"X509 CERTIFICATE", and "CERTIFICATE".[0m[0m[0m
      [0m      [0m[0mSee also [[33mtls.rootCertificates[39m][].[0m[0m[0m
      [0m
        * [0m[0m[33mcert[39m {string|string[]|Buffer|Buffer[]} Cert chains in PEM format. One cert[0m[0m[0m
      [0m      [0m[0mchain should be provided per private key. Each cert chain should consist of[0m[0m[0m
      [0m      [0m[0mthe PEM formatted certificate for a provided private [33mkey[39m, followed by the[0m[0m[0m
      [0m      [0m[0mPEM formatted intermediate certificates (if any), in order, and not[0m[0m[0m
      [0m      [0m[0mincluding the root CA (the root CA must be pre-known to the peer, see [33mca[39m).[0m[0m[0m
      [0m      [0m[0mWhen providing multiple cert chains, they do not have to be in the same[0m[0m[0m
      [0m      [0m[0morder as their private keys in [33mkey[39m. If the intermediate certificates are[0m[0m[0m
      [0m      [0m[0mnot provided, the peer will not be able to validate the certificate, and the[0m[0m[0m
      [0m      [0m[0mhandshake will fail.[0m[0m[0m
      [0m
        * [0m[0m[33msigalgs[39m {string} Colon-separated list of supported signature algorithms.[0m[0m[0m
      [0m      [0m[0mThe list can contain digest algorithms ([33mSHA256[39m, [33mMD5[39m etc.), public key[0m[0m[0m
      [0m      [0m[0malgorithms ([33mRSA-PSS[39m, [33mECDSA[39m etc.), combination of both (e.g[0m[0m[0m
      [0m      [0m[0m'RSA+SHA384') or TLS v1.3 scheme names (e.g. [33mrsa_pss_pss_sha512[39m).[0m[0m[0m
      [0m      [0m[0mSee [34mOpenSSL man pages ([34m[4mhttps://www.openssl.org/docs/man1.1.1/man3/SSL_CTX_set1_sigalgs_list.html[24m[39m[34m)[39m[0m[0m[0m
      [0m      [0m[0mfor more info.[0m[0m[0m
      [0m
        * [0m[0m[33mciphers[39m {string} Cipher suite specification, replacing the default. For[0m[0m[0m
      [0m      [0m[0mmore information, see [modifying the default cipher suite][]. Permitted[0m[0m[0m
      [0m      [0m[0mciphers can be obtained via [[33mtls.getCiphers()[39m][]. Cipher names must be[0m[0m[0m
      [0m      [0m[0muppercased in order for OpenSSL to accept them.[0m[0m[0m
      [0m
        * [0m[0m[33mclientCertEngine[39m {string} Name of an OpenSSL engine which can provide the[0m[0m[0m
      [0m      [0m[0mclient certificate.[0m[0m[0m
      [0m
        * [0m[0m[33mcrl[39m {string|string[]|Buffer|Buffer[]} PEM formatted CRLs (Certificate[0m[0m[0m
      [0m      [0m[0mRevocation Lists).[0m[0m[0m
      [0m
        * [0m[0m[33mdhparam[39m {string|Buffer} Diffie Hellman parameters, required for[0m[0m[0m
      [0m      [0m[0m[Perfect Forward Secrecy][]. Use [33mopenssl dhparam[39m to create the parameters.[0m[0m[0m
      [0m      [0m[0mThe key length must be greater than or equal to 1024 bits or else an error[0m[0m[0m
      [0m      [0m[0mwill be thrown. Although 1024 bits is permissible, use 2048 bits or larger[0m[0m[0m
      [0m      [0m[0mfor stronger security. If omitted or invalid, the parameters are silently[0m[0m[0m
      [0m      [0m[0mdiscarded and DHE ciphers will not be available.[0m[0m[0m
      [0m
        * [0m[0m[33mecdhCurve[39m {string} A string describing a named curve or a colon separated[0m[0m[0m
      [0m      [0m[0mlist of curve NIDs or names, for example [33mP-521:P-384: P-256[39m, to use for[0m[0m[0m
      [0m      [0m[0mECDH key agreement. Set to [33mauto[39m to select the[0m[0m[0m
      [0m      [0m[0mcurve automatically. Use [[33mcrypto.getCurves()[39m][] to obtain a list of[0m[0m[0m
      [0m      [0m[0mavailable curve names. On recent releases, [33mopenssl ecparam -list_curves[39m[0m[0m[0m
      [0m      [0m[0mwill also display the name and description of each available elliptic curve.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [[33mtls.DEFAULT_ECDH_CURVE[39m][].[0m[0m[0m
      [0m
        * [0m[0m[33mhonorCipherOrder[39m {boolean} Attempt to use the server's cipher suite[0m[0m[0m
      [0m      [0m[0mpreferences instead of the client's. When [33mtrue[39m, causes[0m[0m[0m
      [0m      [0m[0m[33mSSL_OP_CIPHER_SERVER_PREFERENCE[39m to be set in [33msecureOptions[39m, see[0m[0m[0m
      [0m      [0m[0m[OpenSSL Options][] for more information.[0m[0m[0m
      [0m
        * [0m[0m[33mkey[39m {string|string[]|Buffer|Buffer[]|Object[]} Private keys in PEM format.[0m[0m[0m
      [0m      [0m[0mPEM allows the option of private keys being encrypted. Encrypted keys will[0m[0m[0m
      [0m      [0m[0mbe decrypted with [33moptions.passphrase[39m. Multiple keys using different[0m[0m[0m
      [0m      [0m[0malgorithms can be provided either as an array of unencrypted key strings or[0m[0m[0m
      [0m      [0m[0mbuffers, or an array of objects in the form[0m[0m[0m
      [0m      [0m[0m[33m{pem: <string|buffer>[, passphrase: <string>]}[39m. The object form can only[0m[0m[0m
      [0m      [0m[0moccur in an array. [33mobject.passphrase[39m is optional. Encrypted keys will be[0m[0m[0m
      [0m      [0m[0mdecrypted with [33mobject.passphrase[39m if provided, or [33moptions.passphrase[39m if[0m[0m[0m
      [0m      [0m[0mit is not.[0m[0m[0m
      [0m
        * [0m[0m[33mprivateKeyEngine[39m {string} Name of an OpenSSL engine to get private key[0m[0m[0m
      [0m      [0m[0mfrom. Should be used together with [33mprivateKeyIdentifier[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mprivateKeyIdentifier[39m {string} Identifier of a private key managed by[0m[0m[0m
      [0m      [0m[0man OpenSSL engine. Should be used together with [33mprivateKeyEngine[39m.[0m[0m[0m
      [0m      [0m[0mShould not be set together with [33mkey[39m, because both options define a[0m[0m[0m
      [0m      [0m[0mprivate key in different ways.[0m[0m[0m
      [0m
        * [0m[0m[33mmaxVersion[39m {string} Optionally set the maximum TLS version to allow. One[0m[0m[0m
      [0m      [0m[0mof [33m'TLSv1.3'[39m, [33m'TLSv1.2'[39m, [33m'TLSv1.1'[39m, or [33m'TLSv1'[39m. Cannot be specified[0m[0m[0m
      [0m      [0m[0malong with the [33msecureProtocol[39m option, use one or the other.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [[33mtls.DEFAULT_MAX_VERSION[39m][].[0m[0m[0m
      [0m
        * [0m[0m[33mminVersion[39m {string} Optionally set the minimum TLS version to allow. One[0m[0m[0m
      [0m      [0m[0mof [33m'TLSv1.3'[39m, [33m'TLSv1.2'[39m, [33m'TLSv1.1'[39m, or [33m'TLSv1'[39m. Cannot be specified[0m[0m[0m
      [0m      [0m[0malong with the [33msecureProtocol[39m option, use one or the other. It is not[0m[0m[0m
      [0m      [0m[0mrecommended to use less than TLSv1.2, but it may be required for[0m[0m[0m
      [0m      [0m[0minteroperability.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [[33mtls.DEFAULT_MIN_VERSION[39m][].[0m[0m[0m
      [0m
        * [0m[0m[33mpassphrase[39m {string} Shared passphrase used for a single private key and/or[0m[0m[0m
      [0m      [0m[0ma PFX.[0m[0m[0m
      [0m
        * [0m[0m[33mpfx[39m {string|string[]|Buffer|Buffer[]|Object[]} PFX or PKCS12 encoded[0m[0m[0m
      [0m      [0m[0mprivate key and certificate chain. [33mpfx[39m is an alternative to providing[0m[0m[0m
      [0m      [0m[0m[33mkey[39m and [33mcert[39m individually. PFX is usually encrypted, if it is,[0m[0m[0m
      [0m      [0m[0m[33mpassphrase[39m will be used to decrypt it. Multiple PFX can be provided either[0m[0m[0m
      [0m      [0m[0mas an array of unencrypted PFX buffers, or an array of objects in the form[0m[0m[0m
      [0m      [0m[0m[33m{buf: <string|buffer>[, passphrase: <string>]}[39m. The object form can only[0m[0m[0m
      [0m      [0m[0moccur in an array. [33mobject.passphrase[39m is optional. Encrypted PFX will be[0m[0m[0m
      [0m      [0m[0mdecrypted with [33mobject.passphrase[39m if provided, or [33moptions.passphrase[39m if[0m[0m[0m
      [0m      [0m[0mit is not.[0m[0m[0m
      [0m
        * [0m[0m[33msecureOptions[39m {number} Optionally affect the OpenSSL protocol behavior,[0m[0m[0m
      [0m      [0m[0mwhich is not usually necessary. This should be used carefully if at all![0m[0m[0m
      [0m      [0m[0mValue is a numeric bitmask of the [33mSSL_OP_*[39m options from[0m[0m[0m
      [0m      [0m[0m[OpenSSL Options][].[0m[0m[0m
      [0m
        * [0m[0m[33msecureProtocol[39m {string} Legacy mechanism to select the TLS protocol[0m[0m[0m
      [0m      [0m[0mversion to use, it does not support independent control of the minimum and[0m[0m[0m
      [0m      [0m[0mmaximum version, and does not support limiting the protocol to TLSv1.3.  Use[0m[0m[0m
      [0m      [0m[0m[33mminVersion[39m and [33mmaxVersion[39m instead.  The possible values are listed as[0m[0m[0m
      [0m      [0m[0m[SSL_METHODS][], use the function names as strings.  For example, use[0m[0m[0m
      [0m      [0m[0m[33m'TLSv1_1_method'[39m to force TLS version 1.1, or [33m'TLS_method'[39m to allow any[0m[0m[0m
      [0m      [0m[0mTLS protocol version up to TLSv1.3.  It is not recommended to use TLS[0m[0m[0m
      [0m      [0m[0mversions less than 1.2, but it may be required for interoperability.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m none, see [33mminVersion[39m.[0m[0m[0m
      [0m
        * [0m[0m[33msessionIdContext[39m {string} Opaque identifier used by servers to ensure[0m[0m[0m
      [0m      [0m[0msession state is not shared between applications. Unused by clients.[0m[0m[0m

[0m[[33mtls.createServer()[39m][] sets the default value of the [33mhonorCipherOrder[39m option[0m
[0mto [33mtrue[39m, other APIs that create secure contexts leave it unset.[0m

[0m[[33mtls.createServer()[39m][] uses a 128 bit truncated SHA1 hash value generated[0m
[0mfrom [33mprocess.argv[39m as the default value of the [33msessionIdContext[39m option, other[0m
[0mAPIs that create secure contexts have no default value.[0m

[0mThe [33mtls.createSecureContext()[39m method creates a [33mSecureContext[39m object. It is[0m
[0musable as an argument to several [33mtls[39m APIs, such as [[33mtls.createServer()[39m][][0m
[0mand [[33mserver.addContext()[39m][], but has no public methods.[0m

[0mA key is [3mrequired[23m for ciphers that make use of certificates. Either [33mkey[39m or[0m
[0m[33mpfx[39m can be used to provide it.[0m

[0mIf the [33mca[39m option is not given, then Node.js will default to using[0m
[0m[Mozilla's publicly trusted list of CAs][].[0m

[32m[1m## [33mtls.createServer([options][, secureConnectionListener])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.2[39m
[90mchanges:[39m
[90m  - version: v12.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/27665[39m
[90m    description: The `options` parameter now supports `net.createServer()`[39m
[90m                 options.[39m
[90m  - version: v9.3.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/14903[39m
[90m    description: The `options` parameter can now include `clientCertEngine`.[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/11984[39m
[90m    description: The `ALPNProtocols` option can be a `TypedArray` or[39m
[90m     `DataView` now.[39m
[90m  - version: v5.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2564[39m
[90m    description: ALPN options are supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object}
        * [0m[0m[33mALPNProtocols[39m: {string[]|Buffer[]|TypedArray[]|DataView[]|Buffer|[0m[0m[0m
      [0m      [0m[0mTypedArray|DataView}[0m[0m[0m
      [0m      [0m[0mAn array of strings, [33mBuffer[39ms or [33mTypedArray[39ms or [33mDataView[39ms, or a single[0m[0m[0m
      [0m      [0m[0m[33mBuffer[39m or [33mTypedArray[39m or [33mDataView[39m containing the supported ALPN[0m[0m[0m
      [0m      [0m[0mprotocols. [33mBuffer[39ms should have the format [33m[len][name][len][name]...[39m[0m[0m[0m
      [0m      [0m[0me.g. [33m0x05hello0x05world[39m, where the first byte is the length of the next[0m[0m[0m
      [0m      [0m[0mprotocol name. Passing an array is usually much simpler, e.g.[0m[0m[0m
      [0m      [0m[0m[33m['hello', 'world'][39m. (Protoc[0m[0m[0m

[0mols should be ordered by their priority.)[0m

    * [0m[33mclientCertEngine[39m {string} Name of an OpenSSL engine which can provide the[0m
      [0mclient certificate.[0m
    * [0m[33menableTrace[39m {boolean} If [33mtrue[39m, [34m[33mtls.TLSSocket.enableTrace()[39m[34m ([34m[4m#tls_tlssocket_enabletrace[24m[39m[34m)[39m will be[0m
      [0mcalled on new connections. Tracing can be enabled after the secure[0m
      [0mconnection is established, but this option must be used to trace the secure[0m
      [0mconnection setup. [1mDefault:[22m [33mfalse[39m.[0m
    * [0m[33mhandshakeTimeout[39m {number} Abort the connection if the SSL/TLS handshake[0m
      [0mdoes not finish in the specified number of milliseconds.[0m
      [0mA [33m'tlsClientError'[39m is emitted on the [33mtls.Server[39m object whenever[0m
      [0ma handshake times out. [1mDefault:[22m [33m120000[39m (120 seconds).[0m
    * [0m[33mrejectUnauthorized[39m {boolean} If not [33mfalse[39m the server will reject any[0m
      [0mconnection which is not authorized with the list of supplied CAs. This[0m
      [0moption only has an effect if [33mrequestCert[39m is [33mtrue[39m. [1mDefault:[22m [33mtrue[39m.[0m
    * [0m[33mrequestCert[39m {boolean} If [33mtrue[39m the server will request a certificate from[0m
      [0mclients that connect and attempt to verify that certificate. [1mDefault:[22m[0m
      [0m[33mfalse[39m.[0m
    * [0m[33msessionTimeout[39m {number} The number of seconds after which a TLS session[0m
      [0mcreated by the server will no longer be resumable. See[0m
      [0m[34mSession Resumption ([34m[4m#tls_session_resumption[24m[39m[34m)[39m for more information. [1mDefault:[22m [33m300[39m.[0m
    * [0m[33mSNICallback(servername, cb)[39m {Function} A function that will be called if[0m
      [0mthe client supports SNI TLS extension. Two arguments will be passed when[0m
      [0mcalled: [33mservername[39m and [33mcb[39m. [33mSNICallback[39m should invoke [33mcb(null, ctx)[39m,[0m
      [0mwhere [33mctx[39m is a [33mSecureContext[39m instance. ([33mtls.createSecureContext(...)[39m[0m
      [0mcan be used to get a proper [33mSecureContext[39m.) If [33mSNICallback[39m wasn't[0m
      [0mprovided the default callback with high-level API will be used (see below).[0m
    * [0m[33mticketKeys[39m: {Buffer} 48-bytes of cryptographically strong pseudo-random[0m
      [0mdata. See [34mSession Resumption ([34m[4m#tls_session_resumption[24m[39m[34m)[39m for more information.[0m
    * [0m[33mpskCallback[39m {Function}
        * [0m[0msocket: {tls.TLSSocket} the server [34m[33mtls.TLSSocket[39m[34m ([34m[4m#tls_class_tls_tlssocket[24m[39m[34m)[39m instance for[0m[0m[0m
      [0m      [0m[0mthis connection.[0m[0m[0m
      [0m
        * [0m[0midentity: {string} identity parameter sent from the client.[0m[0m[0m
      [0m
        * [0m[0mReturns: {Buffer|TypedArray|DataView} pre-shared key that must either be[0m[0m[0m
      [0m      [0m[0ma buffer or [33mnull[39m to stop the negotiation process. Returned PSK must be[0m[0m[0m
      [0m      [0m[0mcompatible with the selected cipher's digest.[0m[0m[0m
      [0m      [0m[0mWhen negotiating TLS-PSK (pre-shared keys), this function is called[0m[0m[0m
      [0m      [0m[0mwith the identity provided by the client.[0m[0m[0m
      [0m      [0m[0mIf the return value is [33mnull[39m the negotiation process will stop and an[0m[0m[0m
      [0m      [0m[0m"unknown_psk_identity" alert message will be sent to the other party.[0m[0m[0m
      [0m      [0m[0mIf the server wishes to hide the fact that the PSK identity was not known,[0m[0m[0m
      [0m      [0m[0mthe callback must provide some random data as [33mpsk[39m to make the connection[0m[0m[0m
      [0m      [0m[0mfail with "decrypt_error" before negotiation is finished.[0m[0m[0m
      [0m      [0m[0mPSK ciphers are disabled by default, and using TLS-PSK thus[0m[0m[0m
      [0m      [0m[0mrequires explicitly specifying a cipher suite with the [33mciphers[39m option.[0m[0m[0m
      [0m      [0m[0mMore information can be found in the [34mRFC 4279 ([34m[4mhttps://tools.ietf.org/html/rfc4279[24m[39m[34m)[39m.[0m[0m[0m
    * [0m[33mpskIdentityHint[39m {string} optional hint to send to a client to help[0m
      [0mwith selecting the identity during TLS-PSK negotiation. Will be ignored[0m
      [0min TLS 1.3. Upon failing to set pskIdentityHint [33m'tlsClientError'[39m will be[0m
      [0memitted with [33m'ERR_TLS_PSK_SET_IDENTIY_HINT_FAILED'[39m code.[0m
    * [0m...: Any [34m[33mtls.createSecureContext()[39m[34m ([34m[4m#tls_tls_createsecurecontext_options[24m[39m[34m)[39m option can be provided. For[0m
      [0mservers, the identity options ([33mpfx[39m, [33mkey[39m/[33mcert[39m or [33mpskCallback[39m)[0m
      [0mare usually required.[0m
    * [0m...: Any [34m[33mnet.createServer()[39m[34m ([34m[4mnet.html#net_net_createserver_options_connectionlistener[24m[39m[34m)[39m option can be provided.
        * [0m[0m[33msecureConnectionListener[39m {Function}[0m[0m[0m
      [0m
        * [0m[0mReturns: {tls.Server}[0m[0m[0m

[0mCreates a new [34m[33mtls.Server[39m[34m ([34m[4m#tls_class_tls_server[24m[39m[34m)[39m. The [33msecureConnectionListener[39m, if provided, is[0m
[0mautomatically set as a listener for the [34m[33m'secureConnection'[39m[34m ([34m[4m#tls_event_secureconnection[24m[39m[34m)[39m event.[0m

[0mThe [33mticketKeys[39m options is automatically shared between [33mcluster[39m module[0m
[0mworkers.[0m

[0mThe following illustrates a simple echo server:[0m

    [94mconst[39m [37mtls[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/tls'[39m[90m)[39m[90m;[39m
    [94mconst[39m [37mfs[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/fs'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37moptions[39m [93m=[39m [33m{[39m
      [37mkey[39m[93m:[39m [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'server-key.pem'[39m[90m)[39m[32m,[39m
      [37mcert[39m[93m:[39m [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'server-cert.pem'[39m[90m)[39m[32m,[39m
    
      [90m// This is necessary only if using client certificate authentication.[39m
      [37mrequestCert[39m[93m:[39m [91mtrue[39m[32m,[39m
    
      [90m// This is necessary only if the client uses a self-signed certificate.[39m
      [37mca[39m[93m:[39m [33m[[39m [37mfs[39m[32m.[39m[37mreadFileSync[39m[90m([39m[92m'client-cert.pem'[39m[90m)[39m [33m][39m
    [33m}[39m[90m;[39m
    
    [94mconst[39m [37mserver[39m [93m=[39m [37mtls[39m[32m.[39m[37mcreateServer[39m[90m([39m[37moptions[39m[32m,[39m [90m([39m[37msocket[39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'server connected'[39m[32m,[39m
                  [37msocket[39m[32m.[39m[37mauthorized[39m [93m?[39m [32m'authorized'[39m [93m:[39m [92m'unauthorized'[39m[90m)[39m[90m;[39m
      [37msocket[39m[32m.[39m[37mwrite[39m[90m([39m[92m'welcome!\n'[39m[90m)[39m[90m;[39m
      [37msocket[39m[32m.[39m[37msetEncoding[39m[90m([39m[92m'utf8'[39m[90m)[39m[90m;[39m
      [37msocket[39m[32m.[39m[37mpipe[39m[90m([39m[37msocket[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m
    [37mserver[39m[32m.[39m[37mlisten[39m[90m([39m[34m8000[39m[32m,[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[92m'server bound'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m;[39m

[0mThe server can be tested by connecting to it using the example client from[0m
[0m[34m[33mtls.connect()[39m[34m ([34m[4m#tls_tls_connect_options_callback[24m[39m[34m)[39m.[0m

[32m[1m## [33mtls.getCiphers()[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.10.2[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0mReturns: {string[]}[0m

[0mReturns an array with the names of the supported TLS ciphers. The names are[0m
[0mlower-case for historical reasons, but must be uppercased to be used in[0m
[0mthe [33mciphers[39m option of [34m[33mtls.createSecureContext()[39m[34m ([34m[4m#tls_tls_createsecurecontext_options[24m[39m[34m)[39m.[0m

[0mCipher names that start with [33m'tls_'[39m are for TLSv1.3, all the others are for[0m
[0mTLSv1.2 and below.[0m

    [34mconsole[39m[32m.[39m[34mlog[39m[90m([39m[37mtls[39m[32m.[39m[37mgetCiphers[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m [90m// ['aes128-gcm-sha256', 'aes128-sha', ...][39m

[32m[1m## [33mtls.rootCertificates[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v12.3.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string[]}[0m

[0mAn immutable array of strings representing the root certificates (in PEM format)[0m
[0mused for verifying peer certificates. This is the default value of the [33mca[39m[0m
[0moption to [34m[33mtls.createSecureContext()[39m[34m ([34m[4m#tls_tls_createsecurecontext_options[24m[39m[34m)[39m.[0m

[32m[1m## [33mtls.DEFAULT_ECDH_CURVE[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.11.13[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/16853[39m
[90m    description: Default value changed to `'auto'`.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe default curve name to use for ECDH key agreement in a tls server. The[0m
[0mdefault value is [33m'auto'[39m. See [34m[33mtls.createSecureContext()[39m[34m ([34m[4m#tls_tls_createsecurecontext_options[24m[39m[34m)[39m for further[0m
[0minformation.[0m

[32m[1m## [33mtls.DEFAULT_MAX_VERSION[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string} The default value of the [33mmaxVersion[39m option of[0m
      [0m[34m[33mtls.createSecureContext()[39m[34m ([34m[4m#tls_tls_createsecurecontext_options[24m[39m[34m)[39m. It can be assigned any of the supported TLS[0m
      [0mprotocol versions, [33m'TLSv1.3'[39m, [33m'TLSv1.2'[39m, [33m'TLSv1.1'[39m, or [33m'TLSv1'[39m.[0m
      [0m[1mDefault:[22m [33m'TLSv1.3'[39m, unless changed using CLI options. Using[0m
      [0m[33m--tls-max-v1.2[39m sets the default to [33m'TLSv1.2'[39m.  Using [33m--tls-max-v1.3[39m sets[0m
      [0mthe default to [33m'TLSv1.3'[39m. If multiple of the options are provided, the[0m
      [0mhighest maximum is used.[0m

[32m[1m## [33mtls.DEFAULT_MIN_VERSION[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v11.4.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m{string} The default value of the [33mminVersion[39m option of[0m
      [0m[34m[33mtls.createSecureContext()[39m[34m ([34m[4m#tls_tls_createsecurecontext_options[24m[39m[34m)[39m. It can be assigned any of the supported TLS[0m
      [0mprotocol versions, [33m'TLSv1.3'[39m, [33m'TLSv1.2'[39m, [33m'TLSv1.1'[39m, or [33m'TLSv1'[39m.[0m
      [0m[1mDefault:[22m [33m'TLSv1.2'[39m, unless changed using CLI options. Using[0m
      [0m[33m--tls-min-v1.0[39m sets the default to [33m'TLSv1'[39m. Using [33m--tls-min-v1.1[39m sets[0m
      [0mthe default to [33m'TLSv1.1'[39m. Using [33m--tls-min-v1.3[39m sets the default to[0m
      [0m[33m'TLSv1.3'[39m. If multiple of the options are provided, the lowest minimum is[0m
      [0mused.[0m

[32m[1m## Deprecated APIs[22m[39m

[32m[1m### Class: [33mCryptoStream[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.4[39m
[90mdeprecated: v0.11.3[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [34m[33mtls.TLSSocket[39m[90m[34m ([34m[4m#tls_class_tls_tlssocket[24m[39m[90m[34m)[39m[90m instead.[0m[23m[39m

[0mThe [33mtls.CryptoStream[39m class represents a stream of encrypted data. This class[0m
[0mis deprecated and should no longer be used.[0m

[32m[1m#### [33mcryptoStream.bytesWritten[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.4[39m
[90mdeprecated: v0.11.3[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33mcryptoStream.bytesWritten[39m property returns the total number of bytes[0m
[0mwritten to the underlying socket [3mincluding[23m the bytes required for the[0m
[0mimplementation of the TLS protocol.[0m

[32m[1m### Class: [33mSecurePair[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.2[39m
[90mdeprecated: v0.11.3[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [34m[33mtls.TLSSocket[39m[90m[34m ([34m[4m#tls_class_tls_tlssocket[24m[39m[90m[34m)[39m[90m instead.[0m[23m[39m

[0mReturned by [34m[33mtls.createSecurePair()[39m[34m ([34m[4m#tls_tls_createsecurepair_context_isserver_requestcert_rejectunauthorized_options[24m[39m[34m)[39m.[0m

[32m[1m#### Event: [33m'secure'[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.2[39m
[90mdeprecated: v0.11.3[39m
[90m-->[39m
[90m[39m
[90m[39m[0mThe [33m'secure'[39m event is emitted by the [33mSecurePair[39m object once a secure[0m
[0mconnection has been established.[0m

[0mAs with checking for the server[0m
[0m[34m[33m'secureConnection'[39m[34m ([34m[4m#tls_event_secureconnection[24m[39m[34m)[39m[0m
[0mevent, [33mpair.cleartext.authorized[39m should be inspected to confirm whether the[0m
[0mcertificate used is properly authorized.[0m

[32m[1m### [33mtls.createSecurePair([context][, isServer][, requestCert][, rejectUnauthorized][, options])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.3.2[39m
[90mdeprecated: v0.11.3[39m
[90mchanges:[39m
[90m  - version: v5.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2564[39m
[90m    description: ALPN options are supported now.[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [34m[33mtls.TLSSocket[39m[90m[34m ([34m[4m#tls_class_tls_tlssocket[24m[39m[90m[34m)[39m[90m instead.[0m[23m[39m

    * [0m[33mcontext[39m {Object} A secure context object as returned by[0m
      [0m[33mtls.createSecureContext()[39m[0m
    * [0m[33misServer[39m {boolean} [33mtrue[39m to specify that this TLS connection should be[0m
      [0mopened as a server.[0m
    * [0m[33mrequestCert[39m {boolean} [33mtrue[39m to specify whether a server should request a[0m
      [0mcertificate from a connecting client. Only applies when [33misServer[39m is [33mtrue[39m.[0m
    * [0m[33mrejectUnauthorized[39m {boolean} If not [33mfalse[39m a server automatically reject[0m
      [0mclients with invalid certificates. Only applies when [33misServer[39m is [33mtrue[39m.[0m
    * [0m[33moptions[39m
        * [0m[0m[33menableTrace[39m: See [34m[33mtls.createServer()[39m[34m ([34m[4m#tls_tls_createserver_options_secureconnectionlistener[24m[39m[34m)[39m[0m[0m[0m
      [0m
        * [0m[0m[33msecureContext[39m: A TLS context object from [34m[33mtls.createSecureContext()[39m[34m ([34m[4m#tls_tls_createsecurecontext_options[24m[39m[34m)[39m[0m[0m[0m
      [0m
        * [0m[0m[33misServer[39m: If [33mtrue[39m the TLS socket will be instantiated in server-mode.[0m[0m[0m
      [0m      [0m[0m[1mDefault:[22m [33mfalse[39m.[0m[0m[0m
      [0m
        * [0m[0m[33mserver[39m {net.Server} A [34m[33mnet.Server[39m[34m ([34m[4mnet.html#net_class_net_server[24m[39m[34m)[39m instance[0m[0m[0m
      [0m
        * [0m[0m[33mrequestCert[39m: See [34m[33mtls.createServer()[39m[34m ([34m[4m#tls_tls_createserver_options_secureconnectionlistener[24m[39m[34m)[39m[0m[0m[0m
      [0m
        * [0m[0m[33mrejectUnauthorized[39m: See [34m[33mtls.createServer()[39m[34m ([34m[4m#tls_tls_createserver_options_secureconnectionlistener[24m[39m[34m)[39m[0m[0m[0m
      [0m
        * [0m[0m[33mALPNProtocols[39m: See [34m[33mtls.createServer()[39m[34m ([34m[4m#tls_tls_createserver_options_secureconnectionlistener[24m[39m[34m)[39m[0m[0m[0m
      [0m
        * [0m[0m[33mSNICallback[39m: See [34m[33mtls.createServer()[39m[34m ([34m[4m#tls_tls_createserver_options_secureconnectionlistener[24m[39m[34m)[39m[0m[0m[0m
      [0m
        * [0m[0m[33msession[39m {Buffer} A [33mBuffer[39m instance containing a TLS session.[0m[0m[0m
      [0m
        * [0m[0m[33mrequestOCSP[39m {boolean} If [33mtrue[39m, specifies that the OCSP status request[0m[0m[0m
      [0m      [0m[0mextension will be added to the client hello and an [33m'OCSPResponse'[39m event[0m[0m[0m
      [0m      [0m[0mwill be emitted on the socket before establishing a secure communication.[0m[0m[0m

[0mCreates a new secure pair object with two streams, one of which reads and writes[0m
[0mthe encrypted data and the other of which reads and writes the cleartext data.[0m
[0mGenerally, the encrypted stream is piped to/from an incoming encrypted data[0m
[0mstream and the cleartext one is used as a replacement for the initial encrypted[0m
[0mstream.[0m

[0m[33mtls.createSecurePair()[39m returns a [33mtls.SecurePair[39m object with [33mcleartext[39m and[0m
[0m[33mencrypted[39m stream properties.[0m

[0mUsing [33mcleartext[39m has the same API as [34m[33mtls.TLSSocket[39m[34m ([34m[4m#tls_class_tls_tlssocket[24m[39m[34m)[39m.[0m

[0mThe [33mtls.createSecurePair()[39m method is now deprecated in favor of[0m
[0m[33mtls.TLSSocket()[39m. For example, the code:[0m

    [37mpair[39m [93m=[39m [37mtls[39m[32m.[39m[37mcreateSecurePair[39m[90m([39m[90m/* ... */[39m[90m)[39m[90m;[39m
    [37mpair[39m[32m.[39m[37mencrypted[39m[32m.[39m[37mpipe[39m[90m([39m[37msocket[39m[90m)[39m[90m;[39m
    [37msocket[39m[32m.[39m[37mpipe[39m[90m([39m[37mpair[39m[32m.[39m[37mencrypted[39m[90m)[39m[90m;[39m

[0mcan be replaced by:[0m

    [37msecureSocket[39m [93m=[39m [37mtls[39m[32m.[39m[37mTLSSocket[39m[90m([39m[37msocket[39m[32m,[39m [37moptions[39m[90m)[39m[90m;[39m

[0mwhere [33msecureSocket[39m has the same API as [33mpair.cleartext[39m.[0m

