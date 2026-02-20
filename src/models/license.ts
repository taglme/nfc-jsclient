export interface LicenseMIDResource {
    mid: string;
}

export interface ApplicationLicenseResource {
    id: string;
    name: string;
    type: string;
    start: string;
    end: string;
    support: string;
}

export interface CreateJobRateLimitResource {
    min_interval_ms?: number | null;
    window_ms?: number | null;
    max_in_window?: number | null;
}

export interface JobCapabilitiesResource {
    allow_repeat: boolean;
    allow_batch: boolean;
    allow_multistep: boolean;
}

export interface CreateJobConstraintsResource {
    max_repeat?: number | null;
    max_steps?: number | null;
    max_queued_jobs_per_adapter?: number | null;
    allowed_scopes?: string[];
    allowed_command_scopes?: string[];
}

export interface LicenseAccessResource {
    machine_id: string;
    host_tier: string;
    allowed_scopes: string[];
    allowed_command_scopes: string[];

    create_job_rate_limit?: CreateJobRateLimitResource;
    job_capabilities?: JobCapabilitiesResource;
    create_job_constraints?: CreateJobConstraintsResource;
}

export interface LicenseResource {
    start: string;
    end: string;
    support: string;
    // Legacy field (older servers).
    features?: string[];
    // Current field.
    plugins?: string[];
    id: string;
    owner: string;
    email: string;
    machine: string;
    type: string;
    host_tier: string;
    applications: ApplicationLicenseResource[];
}
