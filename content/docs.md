
# MrBeam Calculator

Our Free Online Beam Calculator is a powerful tool for engineers and students alike. With this calculator, you can easily calculate bending moment diagrams and shear force diagrams for flat beam systems. Whether you're designing new structures or analyzing existing ones, our calculator provides accurate results to help you make informed decisions. Try it today and see how it can simplify your calculations!

## Features

- **Blazingly fast:** Our calculator performs calculations quickly and efficiently, saving you time and hassle.
- **Lightweight:** Our calculator has a small file size, meaning it won't take up much storage space on your device.
- **PWA:** Our beam calculator is also available as an offline Progressive Web App, so you can use it even when you don't have an internet connection.
- **Easy to understand**: We've designed our calculator with usability in mind, making it easy for even non-experts to use and understand.
- **Easy to use and access:** Installing and using our calculator is a breeze – simply access it through your web browser and start calculating.
- **Persistence state:** Our beam calculator saves your input data automatically, so you can return to your calculation at any time without losing progress.

## How to use

To use the Beam Calculator, start by adding beam elements such as supports and loads. Next, click on the equal sign button located at the bottom right corner of the screen to obtain the solution.

In some cases, you may not see the solution button appear, which usually indicates that the beam you have constructed does not have a solution. To troubleshoot this issue, look for the exclamation mark preceding the list of elements, as this will provide insight into what may be causing the problem.

Finally, if you need to locate a solution at a specific point or extend the beam, simply add a load with a zero value.

We don`t focus strictly on the units of measurement. Instead, we ensure that the solution corresponds to the same units of measurement as the specified loads.

## Restrictions

Please keep in mind that our calculator has a limitation in terms of its solution accuracy. Typically, the precision of the solution is limited to 1e-7. For best results, we recommend using whole numbers whenever possible, as decimals and fractions can introduce additional rounding errors. We apologize for any inconvenience this may cause and encourage you to double-check your inputs and results to ensure the accuracy of your calculations.

## Under the hood

To calculate beams, we use the [finite element method](https://en.wikipedia.org/wiki/Finite_element_method). Here is a brief algorithm for solving this problem:

1. Acceptance of the finite element method computational model
2. Formation of stiffness matrix and load vector of elements in a local coordinate system
3. Construction of global stiffness matrix and load vector
4. Consideration of nodal connections and support conditions
5. Solution of the system of linear equations
6. Determination of the results.

## What's next?

1. Enable material addition feature
2. Implement AI for photo analysis
3. Add beam deflections
4. Add beam stress.
