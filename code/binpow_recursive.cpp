int binpow(int a, int n) {
    if (n == 0) {
        return 1;
    }
    if (n % 2 == 1) {
        return binpow (a, n-1) * a;
    }
    else {
        int b = binpow (a, n/2);
        return b * b;
    }
}