class Std {
    static abs(n) {
        if (typeof n !== "number") return null;
        return Math.abs(n);
    }

    static pow(a, b) {
        if (typeof a !== "number" || typeof b !== "number") return null;
        return Math.pow(a, b);
    }

    static sqrt(n) {
        if (typeof n !== "number" || n < 0) return null;
        return Math.sqrt(n);
    }

    static min(...args) {
        if (!args.every(x => typeof x === "number")) return null;
        return Math.min(...args);
    }

    static max(...args) {
        if (!args.every(x => typeof x === "number")) return null;
        return Math.max(...args);
    }

    static floor(n) {
        if (typeof n !== "number") return null;
        return Math.floor(n);
    }

    static ceil(n) {
        if (typeof n !== "number") return null;
        return Math.ceil(n);
    }

    static round(n) {
        if (typeof n !== "number") return null;
        return Math.round(n);
    }

    static clamp(n, min, max) {
        if (
            typeof n !== "number" ||
            typeof min !== "number" ||
            typeof max !== "number"
        ) return null;

        if (min > max) return null;

        if (n < min) return min;
        if (n > max) return max;
        return n;
    }

    static map(value, inMin, inMax, outMin, outMax) {
        if (
            [value, inMin, inMax, outMin, outMax]
                .some(x => typeof x !== "number")
        ) return null;

        if (inMin === inMax) return null;

        return (
            ((value - inMin) / (inMax - inMin)) *
            (outMax - outMin) +
            outMin
        );
    }

    static random() {
        return Math.random();
    }

    static randomInt(min, max) {
        if (
            typeof min !== "number" ||
            typeof max !== "number"
        ) return null;

        if (max < min) return null;

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static chance(percent) {
        if (typeof percent !== "number") return false;
        if (percent < 0 || percent > 100) return false;

        return Math.random() * 100 < percent;
    }

    static choice(arr) {
        if (!Array.isArray(arr) || arr.length === 0) return null;

        return arr[Math.floor(Math.random() * arr.length)];
    }
}

module.exports = Std;