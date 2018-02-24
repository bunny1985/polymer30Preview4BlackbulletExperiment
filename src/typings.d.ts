declare module "*.html" {
    const content: string;
    export default content;
}

declare module PolyTest {
    interface Card {
        id: number;
        coverImageUrl: string;
        imageUrl: string;
        isFlipped: boolean;
        isMatched: boolean;
    }
    
    interface Time {
        hour: number;
        minute: number;
        second: number;
    }
}

declare function require(string: string): string;

declare module '*.css' {
    const content: string;
    export default content;
  }