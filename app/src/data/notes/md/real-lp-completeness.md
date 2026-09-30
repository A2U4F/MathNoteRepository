## 定理陈述

设 $1 \le p < \infty$，$(E, \mathcal{M}, m)$ 为测度空间，则 $L^p(E)$ 在范数

$$
\|f\|_p = \left( \int_E |f|^p \, dm \right)^{1/p}
$$

下是完备的，即是 **Banach 空间**。

## 证明骨架

设 $\{f_n\}$ 是 $L^p$ 中的 Cauchy 列。

**第一步：抽子列。** 取子列 $\{f_{n_k}\}$ 使得

$$
\|f_{n_{k+1}} - f_{n_k}\|_p < 2^{-k} .
$$

**第二步：构造极限。** 令

$$
g_K(x) = \sum_{k=1}^{K} |f_{n_{k+1}}(x) - f_{n_k}(x)| .
$$

由 Minkowski 不等式 $\|g_K\|_p \le 1$。单调收敛定理给出 $g = \lim_K g_K \in L^p$，故 $g < \infty$ a.e.，级数

$$
f(x) = f_{n_1}(x) + \sum_{k=1}^{\infty} \left( f_{n_{k+1}}(x) - f_{n_k}(x) \right)
$$

几乎处处绝对收敛，定义了极限函数 $f$。

**第三步：$L^p$ 收敛。** 对 $|f - f_{n_k}|^p \le (2g)^p$ 用控制收敛定理（或 Fatou 引理），得 $\|f - f_{n_k}\|_p \to 0$。Cauchy 列有收敛子列，则整个列收敛：

$$
\|f_n - f\|_p \le \|f_n - f_{n_k}\|_p + \|f_{n_k} - f\|_p \to 0 . \qquad \blacksquare
$$

## 评注

- 证明模板（**抽子列 → a.e. 极限 → Fatou 收尾**）在分析中反复出现，值得背下来。
- $p = \infty$ 的情形更简单：Cauchy 列在零测集外一致收敛。
