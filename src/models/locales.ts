export enum Locale {
    Unknown,
    En,
    Ru,
}

export namespace Locale {
    export function toString(t: Locale): string {
        const names = ['unknown', 'en', 'ru'];

        if (t < Locale.En || t > Locale.Ru) {
            return names[0];
        }
        return names[t];
    }

    export function parse(s: string): Locale {
        switch (s) {
            case Locale.toString(Locale.En):
                return Locale.En;
            case Locale.toString(Locale.Ru):
                return Locale.Ru;
        }

        return Locale.Unknown;
    }
}
