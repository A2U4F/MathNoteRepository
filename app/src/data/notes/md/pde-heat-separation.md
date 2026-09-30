## 问题设定

考虑区间 $(0, L)$ 上的齐次热方程初边值问题：

$$
\begin{cases}
u_t = k\, u_{xx}, & 0 < x < L,\ t > 0 \\
u(0,t) = u(L,t) = 0, & t > 0 \\
u(x,0) = \varphi(x), & 0 \le x \le L
\end{cases}
$$

## 第一步：假设变量分离

设 $u(x,t) = X(x)T(t)$，代入方程得

$$
X T' = k X'' T \quad\Longrightarrow\quad \frac{T'}{kT} = \frac{X''}{X} = -\lambda .
$$

左边只依赖 $t$，右边只依赖 $x$，故二者必为同一常数 $-\lambda$。

## 第二步：空间特征值问题

边界条件给出

$$
X'' + \lambda X = 0, \qquad X(0) = X(L) = 0 .
$$

只有当 $\lambda_n = \left(\frac{n\pi}{L}\right)^2$ 时有非零解：

$$
X_n(x) = \sin \frac{n\pi x}{L}, \qquad n = 1, 2, 3, \dots
$$

## 第三步：时间部分与叠加

由 $T' = -k\lambda_n T$ 得 $T_n(t) = e^{-k\lambda_n t}$。叠加得通解

$$
u(x,t) = \sum_{n=1}^{\infty} B_n \sin \frac{n\pi x}{L} \, e^{-k \left(\frac{n\pi}{L}\right)^2 t} .
$$

由初值条件，$B_n$ 是 $\varphi$ 的正弦级数系数：

$$
B_n = \frac{2}{L} \int_0^L \varphi(x) \sin \frac{n\pi x}{L} \, dx .
$$

## 评注

- 所有模式随时间指数衰减，**高频分量衰减更快**——这正是热方程"磨光"初值的体现。
- 方法的关键前提是边界条件齐次；非齐次时需先**齐次化**（找一个满足边值的函数作差）。
