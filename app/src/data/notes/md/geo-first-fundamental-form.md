## 定义

设曲面有参数化 $\mathbf{r}(u, v)$。切平面由 $\mathbf{r}_u, \mathbf{r}_v$ 张成。**第一基本形式**是切向量的内积：

$$
\mathrm{I} = E\, du^2 + 2F\, du\, dv + G\, dv^2,
$$

其中

$$
E = \mathbf{r}_u \cdot \mathbf{r}_u, \qquad
F = \mathbf{r}_u \cdot \mathbf{r}_v, \qquad
G = \mathbf{r}_v \cdot \mathbf{r}_v .
$$

## 它决定什么

**弧长**：曲面上曲线 $\gamma(t) = \mathbf{r}(u(t), v(t))$ 的长度

$$
L = \int_a^b \sqrt{E\, u'^2 + 2F\, u'v' + G\, v'^2} \, dt .
$$

**夹角**：两切方向 $(du, dv)$ 与 $(\delta u, \delta v)$ 的夹角

$$
\cos\theta = \frac{E\, du\, \delta u + F(du\, \delta v + dv\, \delta u) + G\, dv\, \delta v}{\sqrt{\mathrm{I}(du,dv)}\, \sqrt{\mathrm{I}(\delta u, \delta v)}} .
$$

**面积**：区域 $\Omega$ 的面积

$$
A = \iint_\Omega \sqrt{EG - F^2} \, du\, dv .
$$

## 内蕴 vs 外蕴

只由 $\mathrm{I}$（即 $E, F, G$）决定的量称为**内蕴量**——生活在曲面上的"二维居民"不借助外部空间就能测到的几何。弧长、角度、面积、测地线都是内蕴的。

> 关键问题：曲率是内蕴的吗？答案惊人——**Gauss 曲率是内蕴的**（见 Theorema Egregium 笔记）。

## 例：单位球面

$\mathbf{r}(\theta, \varphi) = (\sin\theta\cos\varphi, \sin\theta\sin\varphi, \cos\theta)$，则

$$
\mathrm{I} = d\theta^2 + \sin^2\theta\, d\varphi^2 .
$$

注意 $\varphi$ 方向的长度系数随纬度收缩——这正是"球面不能平铺到平面"的度量根源。
