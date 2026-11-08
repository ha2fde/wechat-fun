export const title = "🎲 玩点有趣的";
export const description = "掷一下骰子，随机抽到一件小事。";

export const productionOrigin = process.env.SITE_URL
  ? new URL(process.env.SITE_URL).origin
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined;

export const follow = {
  name: process.env.WECHAT_ACCOUNT_NAME,
  url: process.env.WECHAT_FOLLOW_URL,
};
