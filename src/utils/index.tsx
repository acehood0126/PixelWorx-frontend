export const ImagePath = (url: string = "avatar.png") => {
  return process.env.NODE_ENV !== "production"
    ? `http://localhost:8000/static/uploads/avatar/${url}`
    : `/static/uploads/avatar/${url}`;
};

export const ResumePath = (url: string = "") => {
  return process.env.NODE_ENV !== "production"
    ? `http://localhost:8000/static/uploads/resume/${url}`
    : `/static/uploads/resume/${url}`;
};

export function PubKeyShortAddress(pubkey: string = "", padCnt: number = 4) {
  return (
    pubkey.slice(0, padCnt + (pubkey.startsWith("0x") ? 2 : 0)) +
    ".".repeat(3) +
    pubkey.slice(-padCnt)
  );
}

export function FullName(user: any) {
  return user?.name ? user?.name : PubKeyShortAddress(user?.address);
}
