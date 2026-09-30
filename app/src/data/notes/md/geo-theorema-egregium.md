## 第二基本形式与 Gauss 曲率

设曲面单位法向为 $\mathbf{N}$。**第二基本形式**刻画曲面在空间中的弯曲：

$$
\mathrm{II} = L\, du^2 + 2M\, du\, dv + N\, dv^2, \qquad
L = \mathbf{r}_{uu} \cdot \mathbf{N},\ M = \mathbf{r}_{uv} \cdot \mathbf{N},\ N = \mathbf{r}_{vv} \cdot \mathbf{N}.
$$

**Gauss 曲率**定义为两个主曲率之积：

$$
K = \kappa_1 \kappa_2 = \frac{LN - M^2}{EG - F^2} .
$$

## Theorema Egregium（绝妙定理）

> Gauss 曲率 $K$ 只依赖于第一基本形式 $E, F, G$ 及其导数。

一个可用 Christoffel 符号写出的表达式：

$$
K = \frac{1}{\sqrt{EG - F^2}} \left[ \frac{\partial}{\partial u} \left( \frac{\sqrt{EG-F^2}}{E} \Gamma_{11}^{2} \right) - \frac{\partial}{\partial v} \left( \frac{\sqrt{EG-F^2}}{E} \Gamma_{12}^{2} \right) \right] .
$$

定性地说：$K$ 是**内蕴量**。两张曲面若局部等距（存在保持 $\mathrm{I}$ 的微分同胚），则对应点 Gauss 曲率相等。

## 推论与直觉

- **球面 vs 平面**：球面 $K = 1/R^2 > 0$，平面 $K = 0$，故球面不可能等距地"摊平"——地图投影必然有畸变。
- **圆柱面** $K = 0$：可以沿母线剪开摊平成平面，与直觉吻合。
- **判别形状**：$K > 0$ 椭圆点（碗状）、$K < 0$ 双曲点（鞍状）、$K = 0$ 抛物点。

## 评注

Gauss 本人称此结论"绝妙"，因为它宣告：**曲面的弯曲可以在曲面内部被感知**。这是 Riemann 几何与广义相对论的远源。
