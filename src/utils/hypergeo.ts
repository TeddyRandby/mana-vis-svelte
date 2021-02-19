export default function hypergeo(deck: number, copies: number, drawn: number, successes: number) {
    let pral: number;
    //Chance to draw x or more cards
    if (successes > 0)
        pral = 1 - hyp(successes - 1, drawn, copies, deck);
    else
        pral = 1;
    if (pral < 1e-6)
        pral = 0;
    pral = (100 * pral);
    return pral;
}

// value, Sample Size, Subpopulation Size, Population Size
function hyp(x: number, sz: number, ss: number, ps: number) {
    let nz: number;
    let mz: number;
    if (ss < sz) {
        nz = ss;
        mz = sz
    } else {
        nz = sz;
        mz = ss
    }
    var h = 1;
    var s = 1;
    var k = 0;
    var i = 0;
    while (i < x) {
        while (s > 1 && k < nz) {
            h = h * (1 - mz / (ps - k));
            s = s * (1 - mz / (ps - k));
            k = k + 1;
        }
        h = h * (nz - i) * (mz - i) / (i + 1) / (ps - nz - mz + i + 1);
        s = s + h;
        i = i + 1;
    }
    while (k < nz) {
        s = s * (1 - mz / (ps - k));
        k = k + 1;
    }
    return s;
}
