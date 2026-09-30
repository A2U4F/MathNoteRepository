/** 四门课的科目信息（首页目录与分组侧栏共用） */
export interface Subject {
  id: string
  no: string
  name: string
  en: string
  blurb: string
}

export interface Note {
  id: string
  subjectId: string
  title: string
  date: string
  summary: string
  tags: string[]
  /** 正文懒加载：每篇是独立 chunk，进入笔记页时才拉取对应的 .md */
  content: () => Promise<string>
}

export const subjects: Subject[] = [
  {
    id: 'pde',
    no: '➊',
    name: '数学物理方程',
    en: 'Partial Differential Equations',
    blurb: '分离变量、行波解、能量方法——三大经典方程的主流解法。',
  },
  {
    id: 'real',
    no: '➋',
    name: '实变函数与泛函分析',
    en: 'Real & Functional Analysis',
    blurb: '从 Lebesgue 积分到 Banach 空间，抽象但极有用。',
  },
  {
    id: 'geometry',
    no: '➌',
    name: '微分几何',
    en: 'Differential Geometry',
    blurb: '曲线、曲面与内蕴几何，Gauss 的绝妙定理。',
  },
  {
    id: 'or',
    no: '➍',
    name: '运筹学',
    en: 'Operations Research',
    blurb: '单纯形法、对偶理论与网络优化，把最优算出来。',
  },
]

// 每篇笔记的正文在 ./md/<id>.md；import.meta.glob 把它们编译成
// 一个个懒加载函数，Vite 构建时各自切成独立 chunk，首页不用背全部正文。
const loaders = import.meta.glob('./md/*.md', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>

const metas: Omit<Note, 'content'>[] = [
  {
    id: "pde-heat-separation",
    subjectId: "pde",
    title: "热方程的分离变量法",
    date: "2026-09-22",
    summary: "以一维齐次热方程为例，完整走一遍分离变量法的流程：设解、分离、解特征值问题、叠加系数。",
    tags: ["热方程", "分离变量", "Fourier 级数"],
  },
  {
    id: "pde-wave-dalembert",
    subjectId: "pde",
    title: "波动方程与 d'Alembert 公式",
    date: "2026-09-18",
    summary: "一维波动方程的通解结构：两个行波的叠加，以及 d'Alembert 公式的推导与依赖区域。",
    tags: ["波动方程", "行波法", "特征线"],
  },
  {
    id: "pde-energy-method",
    subjectId: "pde",
    title: "能量方法与解的唯一性",
    date: "2026-09-12",
    summary: "不依赖显式解，用能量积分证明热方程与波动方程初边值问题解的唯一性。",
    tags: ["能量方法", "唯一性", "先验估计"],
  },
  {
    id: "real-lebesgue-integral",
    subjectId: "real",
    title: "Lebesgue 积分的构造思路",
    date: "2026-09-20",
    summary: "从 Riemann 积分的缺陷出发，理解\"分值域\"而非\"分定义域\"的 Lebesgue 思路，以及简单函数逼近。",
    tags: ["Lebesgue 积分", "可测函数", "简单函数"],
  },
  {
    id: "real-lp-completeness",
    subjectId: "real",
    title: "$L^p$ 空间的完备性（Riesz–Fischer 定理）",
    date: "2026-09-15",
    summary: "证明 $L^p$ 是 Banach 空间：从 Cauchy 列中抽出几乎处处收敛的子列，再用 Fatou 引理收尾。",
    tags: ["Lp 空间", "完备性", "Banach 空间"],
  },
  {
    id: "real-hahn-banach",
    subjectId: "real",
    title: "Hahn–Banach 定理及其推论",
    date: "2026-09-08",
    summary: "保范延拓定理的陈述、Zorn 引理的角色，以及\"泛函分离点\"这一最常用的推论。",
    tags: ["Hahn-Banach", "赋范空间", "对偶空间"],
  },
  {
    id: "geo-frenet",
    subjectId: "geometry",
    title: "Frenet 标架与曲线论基本定理",
    date: "2026-09-19",
    summary: "弧长参数、曲率与挠率的定义，Frenet 公式，以及\"曲率挠率唯一决定曲线\"的基本定理。",
    tags: ["曲线论", "Frenet 公式", "曲率"],
  },
  {
    id: "geo-first-fundamental-form",
    subjectId: "geometry",
    title: "第一基本形式与内蕴度量",
    date: "2026-09-14",
    summary: "曲面上的度量结构：第一基本形式如何决定弧长、夹角与面积，以及内蕴量的概念。",
    tags: ["曲面论", "第一基本形式", "内蕴几何"],
  },
  {
    id: "geo-theorema-egregium",
    subjectId: "geometry",
    title: "Gauss 曲率与绝妙定理",
    date: "2026-09-05",
    summary: "从第二基本形式定义 Gauss 曲率，再到 Theorema Egregium：$K$ 只由第一基本形式决定。",
    tags: ["Gauss 曲率", "Theorema Egregium", "第二基本形式"],
  },
  {
    id: "or-simplex",
    subjectId: "or",
    title: "单纯形法的完整流程",
    date: "2026-09-21",
    summary: "从标准形到单纯形表：进基出基的选取规则、最优性判别与一个手算小例子。",
    tags: ["线性规划", "单纯形法", "基可行解"],
  },
  {
    id: "or-duality",
    subjectId: "or",
    title: "线性规划的对偶理论",
    date: "2026-09-16",
    summary: "对偶问题的构造规则、弱对偶与强对偶定理，以及互补松弛条件的经济解释。",
    tags: ["对偶理论", "影子价格", "互补松弛"],
  },
  {
    id: "or-dijkstra",
    subjectId: "or",
    title: "Dijkstra 最短路算法与正确性证明",
    date: "2026-09-10",
    summary: "贪心选取最近未确定节点，优先队列实现 O(m log n)，并用归纳法证明贪心选择的正确性。",
    tags: ["图论", "最短路", "贪心算法"],
  },
]

export const notes: Note[] = metas.map((m) => {
  const load = loaders[`./md/${m.id}.md`]
  if (!load) throw new Error(`缺少笔记正文：src/data/notes/md/${m.id}.md`)
  return { ...m, content: load }
})

export function getSubject(id: string) {
  return subjects.find((s) => s.id === id)
}

export function getNotesBySubject(subjectId: string) {
  return notes.filter((n) => n.subjectId === subjectId)
}

export function getNote(id: string) {
  return notes.find((n) => n.id === id)
}
