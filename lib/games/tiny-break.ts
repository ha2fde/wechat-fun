import type { Game } from "./types";

export const tinyBreak = {
  id: "tiny-break",
  enabled: true,
  results: [
    { id: "blue", title: "找一点蓝", text: "抬头看看，找出离你最近的蓝色东西。" },
    { id: "band", title: "给乐队取个名", text: "用你看到的第一件东西，给一支虚构乐队取名。" },
    { id: "sound", title: "听十秒", text: "安静十秒，听听平时被你忽略的那个声音。" },
    { id: "line", title: "写一句开场白", text: "如果今天是一部电影，你会用哪句话开场？" },
    { id: "window", title: "看一眼窗外", text: "看看有没有一个你从来没注意过的小细节。" },
    { id: "postcard", title: "给现在寄张明信片", text: "只写三个词，记下你此刻看到的画面。" },
  ],
} as const satisfies Game;
