export const DEFAULT_FORM_KEY = "sportsMeeting";

const defaultNotice =
  "1. 每人可报不超过2个单人项目；2. 参赛当天需携带有效证件；3. 若因身体原因不适合参赛，请及时向组委会报备。";

const eventFormConfigs = {
  sportsMeeting: {
    title: "运动会选拔报名",
    notice: defaultNotice,
    eventGroups: [
      { label: "短跑", options: ["100米", "200米", "400米"] },
      { label: "中长跑", options: ["800米", "1500米", "3000米"] },
      { label: "田赛", options: ["跳远", "跳高", "铅球", "标枪"] },
    ],
  },
  basketballLeague: {
    title: "篮球联赛报名",
    notice:
      "1. 每支球队至少 8 人；2. 同一选手不可同时报名男子 5v5 与女子 5v5；3. 技巧挑战赛、三分赛可额外报名。",
    eventGroups: [
      { label: "团队项目", options: ["男子 5v5", "女子 5v5", "混合 3v3"] },
      { label: "技能赛", options: ["三分大赛", "技巧挑战赛", "扣篮大赛"] },
    ],
  },
  badmintonOpen: {
    title: "羽毛球公开赛报名",
    notice:
      "1. 单打、双打最多各报 2 项；2. 双打需在备注里写明搭档姓名；3. 比赛当天需提前 30 分钟检录。",
    eventGroups: [
      { label: "单打项目", options: ["男子单打", "女子单打"] },
      {
        label: "双打项目",
        options: ["男子双打", "女子双打", "混合双打"],
      },
    ],
  },
  swimmingInvite: {
    title: "游泳邀请赛报名",
    notice:
      "1. 单人最多 3 个泳姿项目；2. 接力项目由体育部统一编队；3. 需自备泳帽、泳镜。",
    eventGroups: [
      {
        label: "泳姿项目",
        options: [
          "50米自由泳",
          "100米自由泳",
          "50米蝶泳",
          "100米蛙泳",
          "100米仰泳",
        ],
      },
      {
        label: "接力项目",
        options: ["4×50米自由泳接力", "4×50米混合泳接力"],
      },
    ],
  },
  trackOpen: {
    title: "田径公开赛报名",
    notice:
      "1. 个人最多报 2 个田赛 + 2 个径赛；2. 若报名接力请在备注写明队友；3. 需穿着钉鞋或专业运动鞋。",
    eventGroups: [
      { label: "短跑", options: ["100米", "200米", "400米"] },
      { label: "中长跑", options: ["800米", "1500米", "3000米"] },
      { label: "田赛", options: ["跳远", "跳高", "铅球", "铁饼"] },
      { label: "接力", options: ["4×100米接力", "4×400米接力"] },
    ],
  },
};

export default eventFormConfigs;

