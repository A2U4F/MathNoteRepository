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
  content: string
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

export const notes: Note[] = [
  {
    id: 'pde-heat-separation',
    subjectId: 'pde',
    title: '热方程的分离变量法',
    date: '2026-09-22',
    summary: '以一维齐次热方程为例，完整走一遍分离变量法的流程：设解、分离、解特征值问题、叠加系数。',
    tags: ['热方程', '分离变量', 'Fourier 级数'],
    content: `## 问题设定

考虑区间 $(0, L)$ 上的齐次热方程初边值问题：

$$
\\begin{cases}
u_t = k\\, u_{xx}, & 0 < x < L,\\ t > 0 \\\\
u(0,t) = u(L,t) = 0, & t > 0 \\\\
u(x,0) = \\varphi(x), & 0 \\le x \\le L
\\end{cases}
$$

## 第一步：假设变量分离

设 $u(x,t) = X(x)T(t)$，代入方程得

$$
X T' = k X'' T \\quad\\Longrightarrow\\quad \\frac{T'}{kT} = \\frac{X''}{X} = -\\lambda .
$$

左边只依赖 $t$，右边只依赖 $x$，故二者必为同一常数 $-\\lambda$。

## 第二步：空间特征值问题

边界条件给出

$$
X'' + \\lambda X = 0, \\qquad X(0) = X(L) = 0 .
$$

只有当 $\\lambda_n = \\left(\\frac{n\\pi}{L}\\right)^2$ 时有非零解：

$$
X_n(x) = \\sin \\frac{n\\pi x}{L}, \\qquad n = 1, 2, 3, \\dots
$$

## 第三步：时间部分与叠加

由 $T' = -k\\lambda_n T$ 得 $T_n(t) = e^{-k\\lambda_n t}$。叠加得通解

$$
u(x,t) = \\sum_{n=1}^{\\infty} B_n \\sin \\frac{n\\pi x}{L} \\, e^{-k \\left(\\frac{n\\pi}{L}\\right)^2 t} .
$$

由初值条件，$B_n$ 是 $\\varphi$ 的正弦级数系数：

$$
B_n = \\frac{2}{L} \\int_0^L \\varphi(x) \\sin \\frac{n\\pi x}{L} \\, dx .
$$

## 评注

- 所有模式随时间指数衰减，**高频分量衰减更快**——这正是热方程"磨光"初值的体现。
- 方法的关键前提是边界条件齐次；非齐次时需先**齐次化**（找一个满足边值的函数作差）。`,
  },
  {
    id: 'pde-wave-dalembert',
    subjectId: 'pde',
    title: "波动方程与 d'Alembert 公式",
    date: '2026-09-18',
    summary: "一维波动方程的通解结构：两个行波的叠加，以及 d'Alembert 公式的推导与依赖区域。",
    tags: ['波动方程', '行波法', '特征线'],
    content: `## 方程与通解

考虑全直线上的波动方程

$$
u_{tt} = c^2 u_{xx}, \\qquad x \\in \\mathbb{R},\\ t > 0 .
$$

作特征变换 $\\xi = x + ct$，$\\eta = x - ct$，则方程化为 $u_{\\xi\\eta} = 0$，故通解为

$$
u(x,t) = F(x + ct) + G(x - ct),
$$

即一个左行波与一个右行波的叠加。

## d'Alembert 公式

代入初值 $u(x,0) = \\varphi(x)$，$u_t(x,0) = \\psi(x)$，解得

$$
u(x,t) = \\frac{\\varphi(x+ct) + \\varphi(x-ct)}{2} + \\frac{1}{2c} \\int_{x-ct}^{x+ct} \\psi(s)\\, ds .
$$

## 依赖区域与影响区域

- 解在点 $(x_0, t_0)$ 的值只由初值在区间 $[x_0 - ct_0,\\ x_0 + ct_0]$ 上的值决定——这就是**依赖区域**。
- 初值在某点 $x_0$ 的扰动，只能影响特征锥 $|x - x_0| \\le ct$ 内部——扰动以有限速度 $c$ 传播。

## 与热方程的对比

| 性质 | 波动方程 | 热方程 |
| --- | --- | --- |
| 传播速度 | 有限（$c$） | 无穷大 |
| 时间反演 | 可逆 | 不可逆 |
| 光滑化效应 | 无 | 强 |`,
  },
  {
    id: 'pde-energy-method',
    subjectId: 'pde',
    title: '能量方法与解的唯一性',
    date: '2026-09-12',
    summary: '不依赖显式解，用能量积分证明热方程与波动方程初边值问题解的唯一性。',
    tags: ['能量方法', '唯一性', '先验估计'],
    content: `## 基本思想

能量方法不构造解，而是对**能量积分**求导，利用方程结构证明能量单调或有界，从而得到唯一性与稳定性。

## 例：热方程解的唯一性

设 $u_1, u_2$ 都是问题

$$
u_t = k u_{xx}, \\quad u(0,t)=u(L,t)=0, \\quad u(x,0)=\\varphi(x)
$$

的解。令 $w = u_1 - u_2$，则 $w$ 满足零初值零边值的同一方程。定义能量

$$
E(t) = \\frac{1}{2} \\int_0^L w^2(x,t) \\, dx .
$$

对 $t$ 求导并用分部积分：

$$
E'(t) = \\int_0^L w\\, w_t \\, dx = k \\int_0^L w\\, w_{xx} \\, dx = -k \\int_0^L w_x^2 \\, dx \\le 0 .
$$

于是 $0 \\le E(t) \\le E(0) = 0$，故 $E(t) \\equiv 0$，即 $w \\equiv 0$，**解唯一**。

## 波动方程的能量守恒

对 $u_{tt} = c^2 u_{xx}$（零边值），总能量

$$
E(t) = \\frac{1}{2} \\int_0^L \\left( u_t^2 + c^2 u_x^2 \\right) dx
$$

满足 $E'(t) = 0$——动能与势能之和**守恒**。这是唯一性、有限传播速度等结论的统一来源。

## 评注

- 能量方法的优势：不要求方程可解出显式解，推广到高维与非线性问题仍然有效。
- 关键技巧是**乘方程、积分、分部积分**，边界项由边值条件消去。`,
  },
  {
    id: 'real-lebesgue-integral',
    subjectId: 'real',
    title: 'Lebesgue 积分的构造思路',
    date: '2026-09-20',
    summary: '从 Riemann 积分的缺陷出发，理解"分值域"而非"分定义域"的 Lebesgue 思路，以及简单函数逼近。',
    tags: ['Lebesgue 积分', '可测函数', '简单函数'],
    content: `## 为什么要换掉 Riemann 积分

Riemann 积分对定义域作分割，要求函数"局部振动小"。但 Dirichlet 函数

$$
D(x) = \\begin{cases} 1, & x \\in \\mathbb{Q} \\\\ 0, & x \\notin \\mathbb{Q} \\end{cases}
$$

在任意小区间上振幅都是 1，Riemann 不可积。它的"直观面积"却显然应该是 0（有理数集是零测集）。

## Lebesgue 的思路：分值域

把值域 $[0, M]$ 切成小段 $[y_{i-1}, y_i)$，看原像集

$$
E_i = \\{ x : y_{i-1} \\le f(x) < y_i \\}
$$

的**测度**，然后求和 $\\sum_i y_{i-1}\\, m(E_i)$。这要求原像集可测——这正是**可测函数**概念的由来。

## 构造步骤

1. **简单函数**：可测集示性函数的有限线性组合 $\\varphi = \\sum_k c_k \\chi_{E_k}$，定义其积分为 $\\sum_k c_k \\, m(E_k)$。
2. **非负可测函数**：用递增简单函数列 $\\varphi_n \\uparrow f$ 逼近，定义

$$
\\int_E f \\, dm = \\lim_{n \\to \\infty} \\int_E \\varphi_n \\, dm .
$$

3. **一般可测函数**：分解 $f = f^+ - f^-$，两部分积分均有限时称 $f$ 可积（$f \\in L^1$）。

## 评注

- Lebesgue 积分下极限与积分交换的条件大为宽松：单调收敛定理、Fatou 引理、控制收敛定理是三大支柱。
- 一句话记忆：**Riemann 分横轴，Lebesgue 分纵轴。**`,
  },
  {
    id: 'real-lp-completeness',
    subjectId: 'real',
    title: '$L^p$ 空间的完备性（Riesz–Fischer 定理）',
    date: '2026-09-15',
    summary: '证明 $L^p$ 是 Banach 空间：从 Cauchy 列中抽出几乎处处收敛的子列，再用 Fatou 引理收尾。',
    tags: ['Lp 空间', '完备性', 'Banach 空间'],
    content: `## 定理陈述

设 $1 \\le p < \\infty$，$(E, \\mathcal{M}, m)$ 为测度空间，则 $L^p(E)$ 在范数

$$
\\|f\\|_p = \\left( \\int_E |f|^p \\, dm \\right)^{1/p}
$$

下是完备的，即是 **Banach 空间**。

## 证明骨架

设 $\\{f_n\\}$ 是 $L^p$ 中的 Cauchy 列。

**第一步：抽子列。** 取子列 $\\{f_{n_k}\\}$ 使得

$$
\\|f_{n_{k+1}} - f_{n_k}\\|_p < 2^{-k} .
$$

**第二步：构造极限。** 令

$$
g_K(x) = \\sum_{k=1}^{K} |f_{n_{k+1}}(x) - f_{n_k}(x)| .
$$

由 Minkowski 不等式 $\\|g_K\\|_p \\le 1$。单调收敛定理给出 $g = \\lim_K g_K \\in L^p$，故 $g < \\infty$ a.e.，级数

$$
f(x) = f_{n_1}(x) + \\sum_{k=1}^{\\infty} \\left( f_{n_{k+1}}(x) - f_{n_k}(x) \\right)
$$

几乎处处绝对收敛，定义了极限函数 $f$。

**第三步：$L^p$ 收敛。** 对 $|f - f_{n_k}|^p \\le (2g)^p$ 用控制收敛定理（或 Fatou 引理），得 $\\|f - f_{n_k}\\|_p \\to 0$。Cauchy 列有收敛子列，则整个列收敛：

$$
\\|f_n - f\\|_p \\le \\|f_n - f_{n_k}\\|_p + \\|f_{n_k} - f\\|_p \\to 0 . \\qquad \\blacksquare
$$

## 评注

- 证明模板（**抽子列 → a.e. 极限 → Fatou 收尾**）在分析中反复出现，值得背下来。
- $p = \\infty$ 的情形更简单：Cauchy 列在零测集外一致收敛。`,
  },
  {
    id: 'real-hahn-banach',
    subjectId: 'real',
    title: 'Hahn–Banach 定理及其推论',
    date: '2026-09-08',
    summary: '保范延拓定理的陈述、Zorn 引理的角色，以及"泛函分离点"这一最常用的推论。',
    tags: ['Hahn-Banach', '赋范空间', '对偶空间'],
    content: `## 定理陈述

设 $X$ 是赋范线性空间，$M \\subset X$ 是线性子空间，$f \\in M^*$（$M$ 上的有界线性泛函）。则存在 $F \\in X^*$ 使得

$$
F\\big|_M = f, \\qquad \\|F\\| = \\|f\\| .
$$

即：**有界线性泛函总可以保范延拓到全空间**。

## 证明要点

1. **一步延拓**：对 $x_0 \\notin M$，把 $f$ 延拓到 $M \\oplus \\operatorname{span}\\{x_0\\}$，关键是取 $F(x_0) = \\alpha$ 满足

$$
\\sup_{y \\in M} \\left[ -\\|y + x_0\\| - f(y) \\right] \\le \\alpha \\le \\inf_{y \\in M} \\left[ \\|y + x_0\\| - f(y) \\right] \\cdot (-1)^{*} ,
$$

区间非空由三角不等式保证。

2. **Zorn 引理**：对所有保范延拓对 $(N, g)$ 按包含关系赋偏序，每条链都有上界（取并），故存在极大元；极大元定义域必为全空间（否则还能再延拓一步）。

## 最常用的推论

**泛函分离点**：对任意 $x_0 \\ne 0$，存在 $F \\in X^*$ 使 $\\|F\\| = 1$ 且 $F(x_0) = \\|x_0\\|$。

> 直接结论：若对所有 $F \\in X^*$ 都有 $F(x) = 0$，则 $x = 0$。对偶空间 $X^*$ 足以区分 $X$ 中的点。

**几何形式（分离定理）**：不相交的凸集（其一有内点）可被超平面分离——这是凸分析与最优化的基石。

## 评注

- Hahn–Banach 是**纯存在性**定理，没有构造性；这正是 Zorn 引理的代价与威力。
- 三个基本定理记一串：Hahn–Banach（延拓）、一致有界原理（共鸣）、开映射定理。`,
  },
  {
    id: 'geo-frenet',
    subjectId: 'geometry',
    title: 'Frenet 标架与曲线论基本定理',
    date: '2026-09-19',
    summary: '弧长参数、曲率与挠率的定义，Frenet 公式，以及"曲率挠率唯一决定曲线"的基本定理。',
    tags: ['曲线论', 'Frenet 公式', '曲率'],
    content: `## 弧长参数化

设正则曲线 $\\alpha: I \\to \\mathbb{R}^3$，$\\alpha'(t) \\ne 0$。定义弧长函数

$$
s(t) = \\int_{t_0}^{t} \\|\\alpha'(u)\\| \\, du .
$$

以弧长为参数时 $\\|\\alpha'(s)\\| = 1$，计算最方便。

## Frenet 标架

在 $\\kappa(s) \\ne 0$ 的点定义三个单位正交向量：

$$
\\mathbf{t} = \\alpha'(s) \\quad (\\text{切向量}), \\qquad
\\mathbf{n} = \\frac{\\mathbf{t}'(s)}{\\|\\mathbf{t}'(s)\\|} \\quad (\\text{主法向量}), \\qquad
\\mathbf{b} = \\mathbf{t} \\times \\mathbf{n} \\quad (\\text{副法向量}) .
$$

**曲率** $\\kappa(s) = \\|\\mathbf{t}'(s)\\|$ 度量弯曲程度；**挠率** $\\tau(s)$ 度量曲线偏离其密切平面的程度。

## Frenet 公式

$$
\\frac{d}{ds} \\begin{pmatrix} \\mathbf{t} \\\\ \\mathbf{n} \\\\ \\mathbf{b} \\end{pmatrix}
=
\\begin{pmatrix}
0 & \\kappa & 0 \\\\
-\\kappa & 0 & \\tau \\\\
0 & -\\tau & 0
\\end{pmatrix}
\\begin{pmatrix} \\mathbf{t} \\\\ \\mathbf{n} \\\\ \\mathbf{b} \\end{pmatrix} .
$$

系数矩阵反对称——这是正交标架求导的必然结果。

## 曲线论基本定理

> 给定连续函数 $\\kappa(s) > 0$ 与 $\\tau(s)$，存在正则曲线以 $s$ 为弧长、$\\kappa$ 为曲率、$\\tau$ 为挠率；且这样的曲线在**刚体运动**意义下唯一。

证明思路：Frenet 公式是关于标架的线性 ODE，由 Picard 存在唯一性定理解出标架，再积分 $\\alpha(s) = \\int \\mathbf{t}\\, ds$ 得到曲线。

## 评注

- $\\tau \\equiv 0 \\iff$ 曲线是平面曲线；$\\kappa \\equiv 0 \\iff$ 直线。
- 螺旋线是 $\\kappa, \\tau$ 均为常数的典型例子。`,
  },
  {
    id: 'geo-first-fundamental-form',
    subjectId: 'geometry',
    title: '第一基本形式与内蕴度量',
    date: '2026-09-14',
    summary: '曲面上的度量结构：第一基本形式如何决定弧长、夹角与面积，以及内蕴量的概念。',
    tags: ['曲面论', '第一基本形式', '内蕴几何'],
    content: `## 定义

设曲面有参数化 $\\mathbf{r}(u, v)$。切平面由 $\\mathbf{r}_u, \\mathbf{r}_v$ 张成。**第一基本形式**是切向量的内积：

$$
\\mathrm{I} = E\\, du^2 + 2F\\, du\\, dv + G\\, dv^2,
$$

其中

$$
E = \\mathbf{r}_u \\cdot \\mathbf{r}_u, \\qquad
F = \\mathbf{r}_u \\cdot \\mathbf{r}_v, \\qquad
G = \\mathbf{r}_v \\cdot \\mathbf{r}_v .
$$

## 它决定什么

**弧长**：曲面上曲线 $\\gamma(t) = \\mathbf{r}(u(t), v(t))$ 的长度

$$
L = \\int_a^b \\sqrt{E\\, u'^2 + 2F\\, u'v' + G\\, v'^2} \\, dt .
$$

**夹角**：两切方向 $(du, dv)$ 与 $(\\delta u, \\delta v)$ 的夹角

$$
\\cos\\theta = \\frac{E\\, du\\, \\delta u + F(du\\, \\delta v + dv\\, \\delta u) + G\\, dv\\, \\delta v}{\\sqrt{\\mathrm{I}(du,dv)}\\, \\sqrt{\\mathrm{I}(\\delta u, \\delta v)}} .
$$

**面积**：区域 $\\Omega$ 的面积

$$
A = \\iint_\\Omega \\sqrt{EG - F^2} \\, du\\, dv .
$$

## 内蕴 vs 外蕴

只由 $\\mathrm{I}$（即 $E, F, G$）决定的量称为**内蕴量**——生活在曲面上的"二维居民"不借助外部空间就能测到的几何。弧长、角度、面积、测地线都是内蕴的。

> 关键问题：曲率是内蕴的吗？答案惊人——**Gauss 曲率是内蕴的**（见 Theorema Egregium 笔记）。

## 例：单位球面

$\\mathbf{r}(\\theta, \\varphi) = (\\sin\\theta\\cos\\varphi, \\sin\\theta\\sin\\varphi, \\cos\\theta)$，则

$$
\\mathrm{I} = d\\theta^2 + \\sin^2\\theta\\, d\\varphi^2 .
$$

注意 $\\varphi$ 方向的长度系数随纬度收缩——这正是"球面不能平铺到平面"的度量根源。`,
  },
  {
    id: 'geo-theorema-egregium',
    subjectId: 'geometry',
    title: 'Gauss 曲率与绝妙定理',
    date: '2026-09-05',
    summary: "从第二基本形式定义 Gauss 曲率，再到 Theorema Egregium：$K$ 只由第一基本形式决定。",
    tags: ['Gauss 曲率', 'Theorema Egregium', '第二基本形式'],
    content: `## 第二基本形式与 Gauss 曲率

设曲面单位法向为 $\\mathbf{N}$。**第二基本形式**刻画曲面在空间中的弯曲：

$$
\\mathrm{II} = L\\, du^2 + 2M\\, du\\, dv + N\\, dv^2, \\qquad
L = \\mathbf{r}_{uu} \\cdot \\mathbf{N},\\ M = \\mathbf{r}_{uv} \\cdot \\mathbf{N},\\ N = \\mathbf{r}_{vv} \\cdot \\mathbf{N}.
$$

**Gauss 曲率**定义为两个主曲率之积：

$$
K = \\kappa_1 \\kappa_2 = \\frac{LN - M^2}{EG - F^2} .
$$

## Theorema Egregium（绝妙定理）

> Gauss 曲率 $K$ 只依赖于第一基本形式 $E, F, G$ 及其导数。

一个可用 Christoffel 符号写出的表达式：

$$
K = \\frac{1}{\\sqrt{EG - F^2}} \\left[ \\frac{\\partial}{\\partial u} \\left( \\frac{\\sqrt{EG-F^2}}{E} \\Gamma_{11}^{2} \\right) - \\frac{\\partial}{\\partial v} \\left( \\frac{\\sqrt{EG-F^2}}{E} \\Gamma_{12}^{2} \\right) \\right] .
$$

定性地说：$K$ 是**内蕴量**。两张曲面若局部等距（存在保持 $\\mathrm{I}$ 的微分同胚），则对应点 Gauss 曲率相等。

## 推论与直觉

- **球面 vs 平面**：球面 $K = 1/R^2 > 0$，平面 $K = 0$，故球面不可能等距地"摊平"——地图投影必然有畸变。
- **圆柱面** $K = 0$：可以沿母线剪开摊平成平面，与直觉吻合。
- **判别形状**：$K > 0$ 椭圆点（碗状）、$K < 0$ 双曲点（鞍状）、$K = 0$ 抛物点。

## 评注

Gauss 本人称此结论"绝妙"，因为它宣告：**曲面的弯曲可以在曲面内部被感知**。这是 Riemann 几何与广义相对论的远源。`,
  },
  {
    id: 'or-simplex',
    subjectId: 'or',
    title: '单纯形法的完整流程',
    date: '2026-09-21',
    summary: '从标准形到单纯形表：进基出基的选取规则、最优性判别与一个手算小例子。',
    tags: ['线性规划', '单纯形法', '基可行解'],
    content: `## 标准形

线性规划标准形：

$$
\\max \\ z = c^T x, \\qquad \\text{s.t. } Ax = b,\\ x \\ge 0 .
$$

几何事实：若最优解存在，则必在可行域（多面体）的**顶点**取得，而顶点对应**基可行解**。单纯形法沿顶点迭代，使目标值单调不减。

## 单纯形表迭代规则

设当前基 $B$，检验数

$$
\\sigma_j = c_j - c_B^T B^{-1} A_j .
$$

1. **最优性判别**（max 问题）：所有 $\\sigma_j \\le 0$ 则当前解最优。
2. **进基**：取 $\\sigma_k = \\max_j \\sigma_j > 0$ 对应的 $x_k$ 进基。
3. **出基**（最小比值规则）：在右端项 $\\bar b = B^{-1}b$ 与进基列 $\\bar A_k = B^{-1}A_k$ 中，取

$$
\\theta = \\min_i \\left\\{ \\frac{\\bar b_i}{\\bar a_{ik}} : \\bar a_{ik} > 0 \\right\\},
$$

对应基变量出基。若所有 $\\bar a_{ik} \\le 0$，问题**无界**。
4. 以主元做**旋转（pivot）**变换，更新单纯形表。

## 手算小例子

$$
\\max z = 3x_1 + 2x_2, \\quad \\text{s.t. } x_1 + x_2 \\le 4,\\ 2x_1 + x_2 \\le 5,\\ x \\ge 0 .
$$

加松弛变量 $x_3, x_4$。初始基 $(x_3, x_4)$，$z = 0$。检验数 $\\sigma_1 = 3 > \\sigma_2 = 2$，$x_1$ 进基；比值 $\\min(4/1, 5/2) = 5/2$，$x_4$ 出基。迭代后 $x_1 = 5/2, x_3 = 3/2$；此时 $\\sigma_2 = 2 - 3/2 \\cdot 1 = 1/2 > 0$，$x_2$ 进基……继续迭代得最优解

$$
x_1 = 1,\\quad x_2 = 3,\\quad z^* = 9 .
$$

## 评注

- 退化时可能**循环**，Bland 规则（取下标最小者）可保证有限终止。
- 单纯形法平均极快，但最坏情形是指数级；椭球法与内点法是多项式时间算法。`,
  },
  {
    id: 'or-duality',
    subjectId: 'or',
    title: '线性规划的对偶理论',
    date: '2026-09-16',
    summary: '对偶问题的构造规则、弱对偶与强对偶定理，以及互补松弛条件的经济解释。',
    tags: ['对偶理论', '影子价格', '互补松弛'],
    content: `## 对偶问题的构造

原问题（max 型）与对偶问题（min 型）一一对应：

$$
\\begin{aligned}
\\text{(P)}\\quad & \\max \\ c^T x \\\\
& \\text{s.t. } Ax \\le b,\\ x \\ge 0
\\end{aligned}
\\qquad\\Longleftrightarrow\\qquad
\\begin{aligned}
\\text{(D)}\\quad & \\min \\ b^T y \\\\
& \\text{s.t. } A^T y \\ge c,\\ y \\ge 0
\\end{aligned}
$$

记忆口诀：**约束对变量、变量对约束**；max 问题的第 $i$ 个 $\\le$ 约束对对偶变量 $y_i \\ge 0$。

## 两个对偶定理

**弱对偶**：若 $x, y$ 分别是 (P)、(D) 的可行解，则

$$
c^T x \\le y^T A x \\le y^T b = b^T y .
$$

任何可行原目标值都不超过任何可行对偶目标值。

**强对偶**：若 (P) 有最优解，则 (D) 也有，且

$$
z^* = c^T x^* = b^T y^* = w^* .
$$

## 互补松弛条件

最优解 $x^*, y^*$ 满足

$$
y_i^* \\left( b_i - \\sum_j a_{ij} x_j^* \\right) = 0, \\qquad
x_j^* \\left( \\sum_i a_{ij} y_i^* - c_j \\right) = 0 .
$$

即：**一个约束不紧（有松弛），其对偶变量必为零**；反之对偶约束不紧，对应原变量为零。

## 经济解释：影子价格

对偶变量 $y_i^* = \\frac{\\partial z^*}{\\partial b_i}$ 是第 $i$ 种资源的**影子价格**——资源每增加一单位，最优收益的边际增量。互补松弛意味着：过剩资源（约束不紧）的影子价格为零，合乎直觉。

## 评注

- 对偶单纯形法在灵敏度分析中非常有用：右端项变化后不必从头求解。
- 写对偶问题时先画对应表，逐行核对符号方向，是最不容易出错的做法。`,
  },
  {
    id: 'or-dijkstra',
    subjectId: 'or',
    title: 'Dijkstra 最短路算法与正确性证明',
    date: '2026-09-10',
    summary: '贪心选取最近未确定节点，优先队列实现 O(m log n)，并用归纳法证明贪心选择的正确性。',
    tags: ['图论', '最短路', '贪心算法'],
    content: `## 问题与算法

给定非负权有向图 $G = (V, E)$，$w: E \\to \\mathbb{R}_{\\ge 0}$，求源点 $s$ 到各点的最短路。

**Dijkstra 算法**：维护距离标号 $d(v)$（初值 $d(s) = 0$，其余 $+\\infty$）。每轮从未确定集合中取出 $d$ 最小的顶点 $u$，将其**确定**，并对出边做松弛：

$$
d(v) \\leftarrow \\min\\{ d(v),\\ d(u) + w(u, v) \\} .
$$

用二叉堆实现，复杂度 $O(m \\log n)$。

## 正确性证明（归纳法）

**断言**：当顶点 $u$ 被取出确定时，$d(u) = \\delta(s, u)$（真实最短距离）。

**归纳步骤**：设此前确定的顶点都满足断言。考虑从 $s$ 到 $u$ 的最短路 $P$，设 $y$ 是 $P$ 上第一个未确定的顶点，$x$ 是其在 $P$ 上的前驱（$x$ 已确定）。

- 由归纳假设，$x$ 确定时 $d(x) = \\delta(s, x)$，松弛后 $d(y) = \\delta(s, y)$；
- 边权非负给出 $\\delta(s, y) \\le \\delta(s, u)$；
- 算法取 $u$ 而非 $y$，说明 $d(u) \\le d(y) = \\delta(s, y)$。

合起来：

$$
d(u) \\le d(y) = \\delta(s, y) \\le \\delta(s, u) \\le d(u),
$$

处处取等，$d(u) = \\delta(s, u)$。$\\blacksquare$

## 关键点与边界

- **非负权是命门**：负权边会让"已确定"的标签失效，需改用 Bellman–Ford。
- 每次松弛记录前驱 $\\pi(v)$，即可回溯重建最短路径树。
- 稠密图用朴素数组实现 $O(n^2)$ 反而更优。

## 评注

Dijkstra 是贪心算法的教科书范例：局部最优（取最近未确定点）之所以通向全局最优，全靠非负权保证的**单调性**。`,
  },
]

export function getSubject(id: string) {
  return subjects.find((s) => s.id === id)
}

export function getNotesBySubject(subjectId: string) {
  return notes.filter((n) => n.subjectId === subjectId)
}

export function getNote(id: string) {
  return notes.find((n) => n.id === id)
}
