export function arrayBufferToBase64(
  buffer: ArrayBuffer,
  safeUrl = false,
): string {
  const bytes = new Uint8Array(buffer);
  const binary = bytes.reduce(
    (binary, byte) => `${binary}${String.fromCharCode(byte)}`,
    '',
  );
  const base64 = btoa(binary);

  return safeUrl ? safeURLencode(base64) : base64;
}

export function safeURLencode(str: string): string {
  return str.replaceAll(/\+/g, '-').replaceAll(/\//g, '_').replace(/=/g, '');
}

export function safeURLdecode(str: string): string {
  return str.replaceAll(/_/g, '/').replaceAll(/-/g, '+');
}

export function randomString(length: number): string {
  const bytes = new Uint32Array(length / 2);
  crypto.getRandomValues(bytes);

  return Array.from(bytes, (dec) => `0${dec.toString(16)}`.slice(-2)).join('');
}

export async function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return crypto.subtle.digest('SHA-256', data);
}

export function extrackJwtClaims<T>(jwt: string): T {
  const [, body] = jwt.split('.');

  return JSON.parse(atob(safeURLdecode(body)));
}
