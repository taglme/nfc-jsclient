export enum SnippetCategory {
    Unknown,
    TagSnippet,
    AdapterSnippet,
}

export namespace SnippetCategory {
    export function toString(status: SnippetCategory): string {
        const names = ['unknown', 'tag', 'adapter'];
        if (status < SnippetCategory.TagSnippet || status > SnippetCategory.AdapterSnippet) {
            return names[0];
        }
        return names[status];
    }

    export function parse(s: string): SnippetCategory {
        switch (s) {
            case SnippetCategory.toString(SnippetCategory.TagSnippet):
                return SnippetCategory.TagSnippet;
            case SnippetCategory.toString(SnippetCategory.AdapterSnippet):
                return SnippetCategory.AdapterSnippet;
        }

        return SnippetCategory.Unknown;
    }
}

export interface SnippetFilter {
    category?: SnippetCategory;
    usageId?: string;
}

export interface SnippetResource {
    name: string;
    category: string;
    usage_id: string;
    usage_name: string;
    description: string;
    code: string;
}
