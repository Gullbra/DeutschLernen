export class DegreesOfComparison {
  public static convert(stem: string, degreesOfComparison: string): string {
    switch (degreesOfComparison) {
      case "superlative":
        if(/(s|ß)$/.test(stem))
          return "am " + stem + "esten"

        return "am " + stem + "sten"

      case "comparative":
        return stem + "er"
    
      default:
        throw new Error(`DegreesOfComparison class: invalid degree of comparison ${degreesOfComparison}`)
    }
  }
}