## 对偶问题的构造

原问题（max 型）与对偶问题（min 型）一一对应：

$$
\begin{aligned}
\text{(P)}\quad & \max \ c^T x \\
& \text{s.t. } Ax \le b,\ x \ge 0
\end{aligned}
\qquad\Longleftrightarrow\qquad
\begin{aligned}
\text{(D)}\quad & \min \ b^T y \\
& \text{s.t. } A^T y \ge c,\ y \ge 0
\end{aligned}
$$

记忆口诀：**约束对变量、变量对约束**；max 问题的第 $i$ 个 $\le$ 约束对对偶变量 $y_i \ge 0$。

## 两个对偶定理

**弱对偶**：若 $x, y$ 分别是 (P)、(D) 的可行解，则

$$
c^T x \le y^T A x \le y^T b = b^T y .
$$

任何可行原目标值都不超过任何可行对偶目标值。

**强对偶**：若 (P) 有最优解，则 (D) 也有，且

$$
z^* = c^T x^* = b^T y^* = w^* .
$$

## 互补松弛条件

最优解 $x^*, y^*$ 满足

$$
y_i^* \left( b_i - \sum_j a_{ij} x_j^* \right) = 0, \qquad
x_j^* \left( \sum_i a_{ij} y_i^* - c_j \right) = 0 .
$$

即：**一个约束不紧（有松弛），其对偶变量必为零**；反之对偶约束不紧，对应原变量为零。

## 经济解释：影子价格

对偶变量 $y_i^* = \frac{\partial z^*}{\partial b_i}$ 是第 $i$ 种资源的**影子价格**——资源每增加一单位，最优收益的边际增量。互补松弛意味着：过剩资源（约束不紧）的影子价格为零，合乎直觉。

## 评注

- 对偶单纯形法在灵敏度分析中非常有用：右端项变化后不必从头求解。
- 写对偶问题时先画对应表，逐行核对符号方向，是最不容易出错的做法。
