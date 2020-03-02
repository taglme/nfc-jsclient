export enum Command {
    Unknown,
    GetTags,
    TransmitAdapter,
    TransmitTag,
    WriteNdef,
    ReadNdef,
    FormatDefault,
    LockPermanent,
    SetPassword,
    RemovePassword,
    AuthPassword,
    GetDump,
    SetLocale,
}

export namespace Command {
    export function toString(c: Command): string {
        const names = [
            'unknown',
            'get_tags',
            'transmit_adapter',
            'transmit_tag',
            'write_ndef',
            'read_ndef',
            'format_default',
            'lock_permanent',
            'set_password',
            'remove_password',
            'auth_password',
            'get_dump',
            'set_locale',
        ];

        if (c < Command.GetTags || c > Command.SetLocale) {
            return names[0];
        }
        return names[c];
    }

    export function parse(s: string): Command {
        switch (s) {
            case Command.toString(Command.GetTags):
                return Command.GetTags;
            case Command.toString(Command.TransmitAdapter):
                return Command.TransmitAdapter;
            case Command.toString(Command.TransmitTag):
                return Command.TransmitTag;
            case Command.toString(Command.WriteNdef):
                return Command.WriteNdef;
            case Command.toString(Command.ReadNdef):
                return Command.ReadNdef;
            case Command.toString(Command.FormatDefault):
                return Command.FormatDefault;
            case Command.toString(Command.LockPermanent):
                return Command.LockPermanent;
            case Command.toString(Command.SetPassword):
                return Command.SetPassword;
            case Command.toString(Command.RemovePassword):
                return Command.RemovePassword;
            case Command.toString(Command.AuthPassword):
                return Command.AuthPassword;
            case Command.toString(Command.GetDump):
                return Command.GetDump;
            case Command.toString(Command.SetLocale):
                return Command.SetLocale;
        }

        return Command.Unknown;
    }
}

export enum CommandStatus {
    Unknown,
    Success,
    Error,
}

export namespace CommandStatus {
    export function toString(status: CommandStatus): string {
        const names = ['unknown', 'success', 'error'];
        if (status < CommandStatus.Success || status > CommandStatus.Error) {
            return names[0];
        }
        return names[status];
    }

    export function parse(s: string): CommandStatus {
        switch (s) {
            case CommandStatus.toString(CommandStatus.Success):
                return CommandStatus.Success;
            case CommandStatus.toString(CommandStatus.Error):
                return CommandStatus.Error;
        }

        return CommandStatus.Unknown;
    }
}
