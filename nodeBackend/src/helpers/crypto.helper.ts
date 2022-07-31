import Bluebird from "bluebird";
import Crypto from "crypto";


export const pbkdf2 = Bluebird.promisify(Crypto.pbkdf2);
export const PBKDF2_HASH = process.env.PBKDF2_HASH ?? '';

export const validatePassword = async (maybePassword: string, passwordHash: string) => {
    const derKey: Buffer = await pbkdf2(maybePassword, PBKDF2_HASH, 1000, 32, 'sha512');
    console.log(derKey.toString());
    console.log(passwordHash);
    return derKey.toString() === passwordHash;
}

export const hashPassword = async (password: string) => {
    return await pbkdf2(password, PBKDF2_HASH, 1000, 32, 'sha512');
}