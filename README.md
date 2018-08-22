<h1>Rupiah Redenomination</h1>

Simple application that given a number of rupiahs will calculate the minimum number of rupiahs needed to make that amount 

example :
15000 = 1 x Rp10000, 1x Rp5000
Rp3900 = 1x Rp2000, 1x Rp1000, 1x Rp500, 4x Rp100
12510 = 1 x Rp10000, 1x Rp2000, 1x Rp500, left Rp10 (no available fraction)

Examples of valid inputs with their canonical equivalents 18.215 (18215), Rp17500 (17500), Rp17.500,00 (17500), Rp 120.325 (120325), 005.000 (5000), 001000 (1000)

Examples of invalid inputs: 17,500 (invalid separator),  2 500(invalid separator), 3000 Rp (valid character in wrong position), Rp (missing value)

Account for only available current rupiah fractions 100000, 50000, 20000, 10000, 5000, 1000, 500, 100 and 50. 

<h2>How to run this application?</h2>
This application is built using <b>React JS</b> and does not use any server side programming language. You only need to install the <b>webpack</b> and <b>npm</b> to be able to run the source code.