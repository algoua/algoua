int binprod_mod(int a, int b, int m) {
    int res = 0;
    a %= m;
    b %= m;
    while (a) {
        if (a & 1) {
            res = (res + b) % m; 
        }
        b = (2 * b) % m; 
        a >>= 1;
    }
    return res;
}