## 弧长参数化

设正则曲线 $\alpha: I \to \mathbb{R}^3$，$\alpha'(t) \ne 0$。定义弧长函数

$$
s(t) = \int_{t_0}^{t} \|\alpha'(u)\| \, du .
$$

以弧长为参数时 $\|\alpha'(s)\| = 1$，计算最方便。

## Frenet 标架

在 $\kappa(s) \ne 0$ 的点定义三个单位正交向量：

$$
\mathbf{t} = \alpha'(s) \quad (\text{切向量}), \qquad
\mathbf{n} = \frac{\mathbf{t}'(s)}{\|\mathbf{t}'(s)\|} \quad (\text{主法向量}), \qquad
\mathbf{b} = \mathbf{t} \times \mathbf{n} \quad (\text{副法向量}) .
$$

**曲率** $\kappa(s) = \|\mathbf{t}'(s)\|$ 度量弯曲程度；**挠率** $\tau(s)$ 度量曲线偏离其密切平面的程度。

## Frenet 公式

$$
\frac{d}{ds} \begin{pmatrix} \mathbf{t} \\ \mathbf{n} \\ \mathbf{b} \end{pmatrix}
=
\begin{pmatrix}
0 & \kappa & 0 \\
-\kappa & 0 & \tau \\
0 & -\tau & 0
\end{pmatrix}
\begin{pmatrix} \mathbf{t} \\ \mathbf{n} \\ \mathbf{b} \end{pmatrix} .
$$

系数矩阵反对称——这是正交标架求导的必然结果。

## 曲线论基本定理

> 给定连续函数 $\kappa(s) > 0$ 与 $\tau(s)$，存在正则曲线以 $s$ 为弧长、$\kappa$ 为曲率、$\tau$ 为挠率；且这样的曲线在**刚体运动**意义下唯一。

证明思路：Frenet 公式是关于标架的线性 ODE，由 Picard 存在唯一性定理解出标架，再积分 $\alpha(s) = \int \mathbf{t}\, ds$ 得到曲线。

## 评注

- $\tau \equiv 0 \iff$ 曲线是平面曲线；$\kappa \equiv 0 \iff$ 直线。
- 螺旋线是 $\kappa, \tau$ 均为常数的典型例子。
