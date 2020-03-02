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

export enum CommandString {
    Unknown = 'unknown',
    GetTags = 'get_tags',
    TransmitAdapter = 'transmit_adapter',
    TransmitTag = 'transmit_tag',
    WriteNdef = 'write_ndef',
    ReadNdef = 'read_ndef',
    FormatDefault = 'format_default',
    LockPermanent = 'lock_permanent',
    SetPassword = 'set_password',
    RemovePassword = 'remove_password',
    AuthPassword = 'auth_password',
    GetDump = 'get_dump',
    SetLocale = 'set_locale',
}

export namespace Command {
    export function toString(c: Command): string {
        const names = [
            CommandString.Unknown,
            CommandString.GetTags,
            CommandString.TransmitAdapter,
            CommandString.TransmitTag,
            CommandString.WriteNdef,
            CommandString.ReadNdef,
            CommandString.FormatDefault,
            CommandString.LockPermanent,
            CommandString.SetPassword,
            CommandString.RemovePassword,
            CommandString.AuthPassword,
            CommandString.GetDump,
            CommandString.SetLocale,
        ];

        if (c < Command.GetTags || c > Command.SetLocale) {
            return names[0];
        }
        return names[c];
    }

    export function parse(s: string): Command {
        switch (s) {
            case CommandString.GetTags:
                return Command.GetTags;
            case CommandString.TransmitAdapter:
                return Command.TransmitAdapter;
            case CommandString.TransmitTag:
                return Command.TransmitTag;
            case CommandString.WriteNdef:
                return Command.WriteNdef;
            case CommandString.ReadNdef:
                return Command.ReadNdef;
            case CommandString.FormatDefault:
                return Command.FormatDefault;
            case CommandString.LockPermanent:
                return Command.LockPermanent;
            case CommandString.SetPassword:
                return Command.SetPassword;
            case CommandString.RemovePassword:
                return Command.RemovePassword;
            case CommandString.AuthPassword:
                return Command.AuthPassword;
            case CommandString.GetDump:
                return Command.GetDump;
            case CommandString.SetLocale:
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
