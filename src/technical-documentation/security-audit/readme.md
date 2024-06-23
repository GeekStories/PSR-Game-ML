# Security Audit

## What is the greatest security risk in this application?
The browser having access to a users web camera can pose a few risks. Especially if their system is already compromised, such as a malicious browser extension, or malware installed on the users computer. This can expose users privacy in unintended ways, such as being recorded, being streamed outside of the game, and potentially leak users geolocation and IP addresses.

## How is this risk mitigated? or if it is not, how should it be?
Currently the application is entirely client side. There is no server to make requests to (with exception of the one that serves the application to a client). This reduces the chances that user data can be intercepted by bad actors over the internet and overall reduces the chances company systems can be accessed through the application itself.

However, this doesn't mitigate any attacks happening on the users system. A malicious browser extension could gain access to the webpage and therefore the users camera (given the user gave the browser sufficient permissions to access their webcamera). This could then be streamed elsewhere, outside of the application, leading to privacy breaches. Unforunately I don't think this is addressable through the application, and soley relies on the user to ensure they aren't installing or giving permissions to malicious software.

## Security risks introduced by the pitched feature
Having peoples web cameras streamed over the internet means bad actors can intercept this data and view the video stream. This can lead to privacy breaches and users geolocation being leaked.

These can be mitigated by ensuring the application doesn't allow cross-origin requests, so systems outside of the application cannot access the users data/video stream. By encrypting data sent between the client and server, meaning even if a bad actor managed to intercept requests, they would be encrypted and unreadable.
