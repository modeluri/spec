// SPDX-License-Identifier: MIT
// Licence normalisation and -open / -weights classification helpers (SPEC.md section 3.3).

/** Unmodified Open Source Initiative approved SPDX identifiers eligible for `-open`. */
export const OSI_SPDX = new Set([
  "Apache-2.0",
  "MIT",
  "BSD-2-Clause",
  "BSD-3-Clause",
  "ISC",
  "0BSD",
  "MPL-2.0",
  "LGPL-2.1-only",
  "LGPL-3.0-only",
  "GPL-2.0-only",
  "GPL-3.0-only",
  "AGPL-3.0-only",
  "EUPL-1.2",
  "UPL-1.0",
  "Unlicense",
]);

const PLACEHOLDERS = new Set(["other", "unknown", "none", "unspecified"]);

const ALIASES = new Map([
  ["apache-2.0", "Apache-2.0"],
  ["apache 2.0", "Apache-2.0"],
  ["apache2", "Apache-2.0"],
  ["apache license 2.0", "Apache-2.0"],
  ["mit", "MIT"],
  ["mit license", "MIT"],
  ["agpl-3.0", "AGPL-3.0-only"],
  ["agpl-3.0-only", "AGPL-3.0-only"],
  ["agplv3", "AGPL-3.0-only"],
  ["gpl-3.0", "GPL-3.0-only"],
  ["gpl-3.0-only", "GPL-3.0-only"],
  ["gpl-2.0", "GPL-2.0-only"],
  ["gpl-2.0-only", "GPL-2.0-only"],
  ["lgpl-3.0", "LGPL-3.0-only"],
  ["lgpl-3.0-only", "LGPL-3.0-only"],
  ["lgpl-2.1", "LGPL-2.1-only"],
  ["lgpl-2.1-only", "LGPL-2.1-only"],
  ["bsd-3-clause", "BSD-3-Clause"],
  ["bsd 3-clause", "BSD-3-Clause"],
  ["bsd-2-clause", "BSD-2-Clause"],
  ["bsd 2-clause", "BSD-2-Clause"],
  ["mpl-2.0", "MPL-2.0"],
  ["isc", "ISC"],
  ["0bsd", "0BSD"],
  ["eupl-1.2", "EUPL-1.2"],
  ["upl-1.0", "UPL-1.0"],
  ["unlicense", "Unlicense"],
  ["cc-by-nc-4.0", "CC-BY-NC-4.0"],
  ["cc-by-4.0", "CC-BY-4.0"],
  ["cc-by-sa-4.0", "CC-BY-SA-4.0"],
  ["openmdw-1.1", "OpenMDW-1.1"],
  ["gemma", "Gemma Terms of Use"],
  ["gemma terms of use", "Gemma Terms of Use"],
  ["mrl", "Mistral Research License"],
  ["mnpl", "Mistral AI Non-Production License"],
  ["llama4", "Llama 4 Community License"],
  ["llama3.3", "Llama 3.3 Community License"],
  ["llama3.2", "Llama 3.2 Community License"],
  ["llama3.1", "Llama 3.1 Community License"],
  ["llama3", "Llama 3 Community License"],
  ["llama2", "Llama 2 Community License"],
  ["modified-mit", "Modified MIT"],
  ["modified mit", "Modified MIT"],
  ["jamba-open-model-license", "Jamba Open Model License Agreement"],
  ["qwen-research", "Qwen Research License Agreement"],
  ["qwen", "Qwen License Agreement"],
  ["qwen-community-1.0", "Qwen Community License 1.0"],
  ["qwen3.8-max", "Qwen3.8-Max License"],
  ["minimax-community", "MiniMax Community License"],
  ["kimi-k3.1-pro", "Kimi K3.1-Pro License"],
  ["kimi-k3", "Kimi K3 License"],
  ["nvidia-open-model-license", "NVIDIA Open Model License Agreement"],
  ["nvidia-nemotron-open-model-license", "NVIDIA Nemotron Open Model License"],
  ["nvidia-open-model-agreement", "NVIDIA Open Model Agreement"],
  // Hugging Face slug without a version; every card using it links the 1.1 text.
  ["openmdw-license-agreement", "OpenMDW-1.1"],
  ["reka-edge-2603-license", "BUSL-1.1"],
  ["glm-5.3", "GLM-5.3 License"],
  ["proprietary", "proprietary"],
]);

/**
 * Normalise a raw catalogue licence string into a canonical SPDX identifier or publisher licence name.
 * Returns null for empty or placeholder values.
 */
export function normalizeLicense(raw) {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const key = trimmed.toLowerCase();
  if (PLACEHOLDERS.has(key)) return null;
  return ALIASES.get(key) ?? trimmed;
}

/**
 * Return `"open"`, `"weights"`, `undefined` (closed proprietary), or `null` (unverifiable).
 */
export function weightsSuffixFor(raw) {
  const norm = normalizeLicense(raw);
  if (norm === null) return null;
  if (norm === "proprietary") return undefined;
  return OSI_SPDX.has(norm) ? "open" : "weights";
}

/**
 * Check that a parsed URI's `weights` suffix matches the entry's normalised `license` field.
 */
export function checkLicenseConsistency(weightsSuffix, license) {
  if (typeof license !== "string" || normalizeLicense(license) !== license) {
    return { ok: false, error: `unnormalised or missing license: ${license}` };
  }
  // A bare lowercase slug (for example a Hugging Face license_name) is neither SPDX nor the licence's own title.
  if (license !== "proprietary" && /^[a-z0-9][a-z0-9.-]*$/.test(license)) {
    return { ok: false, error: `licence slug instead of an SPDX identifier or the licence title: ${license}` };
  }
  if (!weightsSuffix) {
    return license === "proprietary"
      ? { ok: true }
      : { ok: false, error: `closed model without weights suffix must use "proprietary", got ${license}` };
  }
  if (weightsSuffix === "open") {
    return OSI_SPDX.has(license)
      ? { ok: true }
      : { ok: false, error: `-open requires an unmodified OSI-approved SPDX licence, got ${license}` };
  }
  if (weightsSuffix === "weights") {
    return license !== "proprietary" && !OSI_SPDX.has(license)
      ? { ok: true }
      : { ok: false, error: `-weights cannot be used with ${license}` };
  }
  return { ok: false, error: `unknown weights suffix: ${weightsSuffix}` };
}
