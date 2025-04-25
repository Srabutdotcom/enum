import { Cipher } from "../src/cipher.js";

const aesgcm = Cipher.AES_128_GCM_SHA256;

const isAesGcm = aesgcm.name.includes("aes")&&aesgcm.name.includes("gcm");

