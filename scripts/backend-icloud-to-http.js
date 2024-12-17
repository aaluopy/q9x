console.log($request.path); // The $request.path we get should be 「/icloud-profile/shared-profile/apple-tv.conf」.

const ErrorStatus = "HTTP/1.1 404 Not Found";
const ErrorHeaders = { "Connection": "Close" };
const ErrorResponse = {
    status: ErrorStatus,
    headers: ErrorHeaders
};

const basePath = "/icloud-profile/";
if (!$request.path.startsWith(basePath)) {
    console.log("Illegal request.");
    $done(ErrorResponse);

    return;
}

let filePath = $request.path.substr(basePath.length); // The filePath we get should be 「shared-profile/apple-tv.conf」 and we will fetch the actual file existed in iCloud Drive /Quantumult X/Data/shared-profile/apple-tv.conf later.

let profileUint8Array = $iCloud.readFile(filePath);
if (profileUint8Array === undefined) {
    console.log("iCloud file does not exist.");
    $done(ErrorResponse);

    return;
}

let profileBuffer = profileUint8Array.buffer.slice(profileUint8Array.byteOffset, profileUint8Array.byteLength + profileUint8Array.byteOffset);

const okStatus = "HTTP/1.1 200 OK";
const okHeaders = { "Connection": "Close" };
const okResponse = {
    status: okStatus,
    headers: okHeaders,
    bodyBytes: profileBuffer
};

console.log("OK");
$done(okResponse);
