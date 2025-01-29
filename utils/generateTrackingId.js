import crypto from 'crypto';

const generateTrackingId = () => {
    const timestamp = Date.now();
    const randomString = crypto.randomBytes(4).toString('hex');
    return `VPT-${timestamp}-${randomString}`;
};

export default generateTrackingId;