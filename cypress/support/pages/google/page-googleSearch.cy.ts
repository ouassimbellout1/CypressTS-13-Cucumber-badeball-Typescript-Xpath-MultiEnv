class GoogleSearch {

    say(somethingToSay: String): void {
        console.log("HELLO", somethingToSay)
    }
    
    localFunctionWithTypes(a: number, b: number): number {
        return a + b
    };

};

export default new GoogleSearch();