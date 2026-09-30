## 为什么要换掉 Riemann 积分

Riemann 积分对定义域作分割，要求函数"局部振动小"。但 Dirichlet 函数

$$
D(x) = \begin{cases} 1, & x \in \mathbb{Q} \\ 0, & x \notin \mathbb{Q} \end{cases}
$$

在任意小区间上振幅都是 1，Riemann 不可积。它的"直观面积"却显然应该是 0（有理数集是零测集）。

## Lebesgue 的思路：分值域

把值域 $[0, M]$ 切成小段 $[y_{i-1}, y_i)$，看原像集

$$
E_i = \{ x : y_{i-1} \le f(x) < y_i \}
$$

的**测度**，然后求和 $\sum_i y_{i-1}\, m(E_i)$。这要求原像集可测——这正是**可测函数**概念的由来。

## 构造步骤

1. **简单函数**：可测集示性函数的有限线性组合 $\varphi = \sum_k c_k \chi_{E_k}$，定义其积分为 $\sum_k c_k \, m(E_k)$。
2. **非负可测函数**：用递增简单函数列 $\varphi_n \uparrow f$ 逼近，定义

$$
\int_E f \, dm = \lim_{n \to \infty} \int_E \varphi_n \, dm .
$$

3. **一般可测函数**：分解 $f = f^+ - f^-$，两部分积分均有限时称 $f$ 可积（$f \in L^1$）。

## 评注

- Lebesgue 积分下极限与积分交换的条件大为宽松：单调收敛定理、Fatou 引理、控制收敛定理是三大支柱。
- 一句话记忆：**Riemann 分横轴，Lebesgue 分纵轴。**
