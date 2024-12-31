export const calcAlc = (start:number, final:number, add:number, factor:number) => {
    return ((start - final) *
        ((23 - add)/23) /
        factor);
}

export const calcPort = (Alcohol: number, BrandyProof: number, TotalBrandy: number, TotalWine: number) => {
    return ((Alcohol/100) + ((BrandyProof/2/100) * (TotalBrandy/TotalWine))) * 100
}