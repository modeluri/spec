// SPDX-License-Identifier: CC0-1.0
// Classification table mapping models.dev canonical IDs to Model URIs, incompatible entries, or skipped out-of-scope records.
// Tiers are assigned under SPEC.md section 3.2 and frozen at release; rebuilt deterministically by tools/build-registry.mjs.

// Controlled vocabulary of registered `special` suffixes (SPEC.md sections 3.3 and 5).
// A value is added only when at least one real published model needs it to avoid colliding with the general lineup.
export const SPECIALS = {
  code: "Published as specialised for code.",
  rt: "Real-time streaming or duplex interaction (such as live voice on omni or streaming speech-to-text on transcribe).",
  base: "Pre-trained weights without instruction tuning.",
  guard: "Safety, content moderation or prompt-injection guardrails.",
  ocr: "Document optical character recognition and layout extraction.",
  translate: "Dedicated machine translation.",
  research: "Autonomous multi-step deep research and report synthesis.",
  gui: "Graphical user interface grounding and control (desktop computer use, browser automation and mobile device agents).",
  robotics: "Embodied robotics reasoning and physical-world control.",
  roleplay: "Character-driven dialogue and interactive roleplay.",
  medical: "Clinical, healthcare and biomedical specialisation.",
  finance: "Financial analysis, markets and accounting specialisation.",
  legal: "Legal reasoning, statutory analysis and compliance specialisation.",
  voiceclone: "Voice cloning from a reference speaker sample (on tts).",
  voicedesign: "Generating a synthetic voice from a text description (on tts).",
};

export const CLASSIFICATION = [
  {
    "id": "ai21/jamba-mini",
    "uri": "model:ai21/text/light-open:2",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/ai21labs/AI21-Jamba2-Mini",
    "current": true
  },
  {
    "id": "ai21/jamba-large",
    "uri": "model:ai21/text/ultra-weights:1.7",
    "license": "Jamba Open Model License Agreement",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/ai21labs/AI21-Jamba-Large-1.7",
    "current": true
  },
  {
    "id": "aion-labs/aion-2.0",
    "uri": "model:aion-labs/text/core:2.0",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/aion-labs/aion-2.0.toml",
    "current": false
  },
  {
    "id": "aion-labs/aion-3.0",
    "uri": "model:aion-labs/text/core:3.0",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/aion-labs/aion-3.0.toml",
    "current": true
  },
  {
    "id": "aion-labs/aion-3.0-mini",
    "uri": "model:aion-labs/text/light:3.0",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/aion-labs/aion-3.0-mini.toml",
    "current": true
  },
  {
    "id": "aleph-alpha/kolibri-1",
    "uri": "model:aleph-alpha/text/core-open/78b-a3.46b:1",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Aleph-Alpha/Kolibri-1",
    "current": true
  },
  {
    "id": "alibaba/qwen3-embedding-8b",
    "uri": "model:alibaba/embed/core-open/8b:3",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen3-Embedding-8B",
    "current": true
  },
  {
    "id": "alibaba/qwen-image-2.1",
    "uri": "model:alibaba/image/core-weights:2.1",
    "license": "Qwen Research License Agreement",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen-Image-2.1",
    "current": true
  },
  {
    "id": "alibaba/qwen-omni-turbo",
    "uri": "model:alibaba/omni/core:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/alibaba/qwen-omni-turbo.toml",
    "current": false,
    "former_native": { "alibaba": "qwen-omni-turbo" }
  },
  {
    "id": "alibaba/qwen3-reranker-8b",
    "uri": "model:alibaba/rerank/core-open/8b:3",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen3-Reranker-8B",
    "current": true
  },
  {
    "id": "alibaba/qwen3.5-35b-a3b-base",
    "uri": "model:alibaba/text/core-base-open/35b-a3b:3.5",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen3.5-35B-A3B-Base",
    "current": true
  },
  {
    "id": "alibaba/qwen3-coder-next",
    "uri": "model:alibaba/text/core-code-open:3.next",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen3-Coder-Next",
    "current": true
  },
  {
    "id": "alibaba/qwen2.5-coder-32b-instruct",
    "uri": "model:alibaba/text/core-code-open/32b:2.5",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen2.5-Coder-32B-Instruct",
    "current": true
  },
  {
    "id": "alibaba/qwen3-coder-plus",
    "uri": "model:alibaba/text/core-code:3",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/alibaba/qwen3-coder-plus.toml",
    "current": false
  },
  {
    "id": "alibaba/qwen3.5-27b",
    "uri": "model:alibaba/text/core-open/27b:3.5",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen3.5-27B",
    "current": false
  },
  {
    "id": "alibaba/qwen3.6-27b",
    "uri": "model:alibaba/text/core-open/27b:3.6",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen3.6-27B",
    "current": false
  },
  {
    "id": "alibaba/qwen3.8-27b",
    "uri": "model:alibaba/text/core-open/27b:3.8",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen3.8-27B",
    "current": true
  },
  {
    "id": "alibaba/qwen3-32b",
    "uri": "model:alibaba/text/core-open/32b:3",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen3-32B",
    "current": false
  },
  {
    "id": "alibaba/qwen3.5-35b-a3b",
    "uri": "model:alibaba/text/core-open/35b-a3b:3.5",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen3.5-35B-A3B",
    "current": false
  },
  {
    "id": "alibaba/qwen3.6-35b-a3b",
    "uri": "model:alibaba/text/core-open/35b-a3b:3.6",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen3.6-35B-A3B",
    "current": true
  },
  {
    "id": "alibaba/qwen-mt-plus",
    "uri": "model:alibaba/text/core-translate:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/alibaba/qwen-mt-plus.toml",
    "current": true
  },
  {
    "id": "alibaba/qwen3-vl-plus",
    "uri": "model:alibaba/text/core:3",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/alibaba/qwen3-vl-plus.toml",
    "current": false
  },
  {
    "id": "alibaba/qwen3.5-plus",
    "uri": "model:alibaba/text/core:3.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/alibaba/qwen3.5-plus.toml",
    "current": false
  },
  {
    "id": "alibaba/qwen3.6-plus",
    "uri": "model:alibaba/text/core:3.6",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/alibaba/qwen3.6-plus.toml",
    "current": false
  },
  {
    "id": "alibaba/qwen3.7-plus",
    "uri": "model:alibaba/text/core:3.7",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/alibaba/qwen3.7-plus.toml",
    "current": true
  },
  {
    "id": "alibaba/qwen3.5-122b-a10b",
    "uri": "model:alibaba/text/high-open/122b-a10b:3.5",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen3.5-122B-A10B",
    "current": true
  },
  {
    "id": "alibaba/qwen3-next-80b-a3b-instruct",
    "uri": "model:alibaba/text/high-open/80b-a3b:3.next",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen3-Next-80B-A3B-Instruct",
    "current": false
  },
  {
    "id": "alibaba/qwen2-5-vl-72b-instruct",
    "uri": "model:alibaba/text/high-weights/72b:2.5",
    "license": "Qwen License Agreement",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen2.5-VL-72B-Instruct",
    "current": true
  },
  {
    "id": "alibaba/qwen3.5-9b-base",
    "uri": "model:alibaba/text/light-base-open/9b:3.5",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen3.5-9B-Base",
    "current": true
  },
  {
    "id": "alibaba/qwen3-coder-30b-a3b-instruct",
    "uri": "model:alibaba/text/light-code-open/30b-a3b:3",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct",
    "current": false
  },
  {
    "id": "alibaba/qwen3-coder-flash",
    "uri": "model:alibaba/text/light-code:3",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/alibaba/qwen3-coder-flash.toml",
    "current": true
  },
  {
    "id": "alibaba/qwen3-30b-a3b",
    "uri": "model:alibaba/text/light-open/30b-a3b:3",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen3-30B-A3B",
    "current": false
  },
  {
    "id": "alibaba/qwen3-30b-a3b-instruct-2507",
    "uri": "model:alibaba/text/light-open/30b-a3b:3.2507",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen3-30B-A3B-Instruct-2507",
    "current": true
  },
  {
    "id": "alibaba/qwen2.5-7b-instruct",
    "uri": "model:alibaba/text/light-open/7b:2.5",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen2.5-7B-Instruct",
    "current": true
  },
  {
    "id": "alibaba/qwen3-8b",
    "uri": "model:alibaba/text/light-open/8b:3",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen3-8B",
    "current": false
  },
  {
    "id": "alibaba/qwen3.5-9b",
    "uri": "model:alibaba/text/light-open/9b:3.5",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen3.5-9B",
    "current": true
  },
  {
    "id": "alibaba/qwen3.8-flash-next",
    "uri": "model:alibaba/text/light-weights/125b-a6b:3.8",
    "license": "Qwen Community License 1.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen3.8-Flash-Next",
    "current": true
  },
  {
    "id": "alibaba/qwen3.5-flash",
    "uri": "model:alibaba/text/light:3.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/alibaba/qwen3.5-flash.toml",
    "current": false
  },
  {
    "id": "alibaba/qwen3.6-flash",
    "uri": "model:alibaba/text/light:3.6",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/alibaba/qwen3.6-flash.toml",
    "current": false
  },
  {
    "id": "alibaba/qwen3.7-flash",
    "uri": "model:alibaba/text/light:3.7",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/alibaba/qwen3.7-flash.toml",
    "current": false
  },
  {
    "id": "alibaba/qwen3.8-flash",
    "uri": "model:alibaba/text/light:3.8",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/alibaba/qwen3.8-flash.toml",
    "current": true
  },
  {
    "id": "alibaba/qwen3-coder-480b-a35b-instruct",
    "uri": "model:alibaba/text/ultra-code-open/480b-a35b:3",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen3-Coder-480B-A35B-Instruct",
    "current": false
  },
  {
    "id": "alibaba/qwen3-235b-a22b",
    "uri": "model:alibaba/text/ultra-open/235b-a22b:3",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen3-235B-A22B",
    "current": false
  },
  {
    "id": "alibaba/qwen3-235b-a22b-instruct-2507",
    "uri": "model:alibaba/text/ultra-open/235b-a22b:3.2507",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen3-235B-A22B-Instruct-2507",
    "current": true
  },
  {
    "id": "alibaba/qwen3.5-397b-a17b",
    "uri": "model:alibaba/text/ultra-open/397b-a17b:3.5",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen3.5-397B-A17B",
    "current": true
  },
  {
    "id": "alibaba/qwen3.8-2.4t-a95b",
    "uri": "model:alibaba/text/ultra-weights/2.4t-a95b:3.8",
    "license": "Qwen3.8-Max License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B",
    "current": true
  },
  {
    "id": "alibaba/qwen3-max",
    "uri": "model:alibaba/text/ultra:3",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/alibaba/qwen3-max.toml",
    "current": false
  },
  {
    "id": "alibaba/qwen3.6-max-preview",
    "uri": "model:alibaba/text/ultra:3.6",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/alibaba/qwen3.6-max-preview.toml",
    "current": false
  },
  {
    "id": "alibaba/qwen3.7-max",
    "uri": "model:alibaba/text/ultra:3.7",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/alibaba/qwen3.7-max.toml",
    "current": false
  },
  {
    "id": "alibaba/qwen3.8-max",
    "uri": "model:alibaba/text/ultra:3.8",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/alibaba/qwen3.8-max.toml",
    "current": false
  },
  {
    "id": "alibaba/qwen4-max",
    "uri": "model:alibaba/text/ultra:4",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/alibaba/qwen4-max.toml",
    "current": true
  },
  {
    "id": "alibaba/qwen2.5-coder-0.5b",
    "uri": "model:alibaba/text/nano-code-open/0.5b:2.5",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen2.5-Coder-0.5B",
    "current": true
  },
  {
    "id": "alibaba/qwen3.5-0.8b",
    "uri": "model:alibaba/text/nano-open/0.8b:3.5",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen3.5-0.8B",
    "current": true
  },
  {
    "id": "alibaba/qwen3.5-2b",
    "uri": "model:alibaba/text/nano-open/2b:3.5",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen3.5-2B",
    "current": true
  },
  {
    "id": "alibaba/qwen3.5-4b",
    "uri": "model:alibaba/text/nano-open/4b:3.5",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Qwen/Qwen3.5-4B",
    "current": true
  },
  {
    "id": "amazon/nova-pro",
    "uri": "model:amazon/text/core:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/amazon/nova-pro.toml",
    "current": true
  },
  {
    "id": "amazon/nova-lite",
    "uri": "model:amazon/text/light:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/amazon/nova-lite.toml",
    "current": false
  },
  {
    "id": "amazon/nova-2-lite",
    "uri": "model:amazon/text/light:2",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/amazon/nova-2-lite.toml",
    "current": true
  },
  {
    "id": "amazon/nova-premier",
    "uri": "model:amazon/text/ultra:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/amazon/nova-premier.toml",
    "current": false
  },
  {
    "id": "amazon/nova-micro",
    "uri": "model:amazon/text/nano:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/amazon/nova-micro.toml",
    "current": true
  },
  {
    "id": "anthropic/claude-3-5-sonnet-20241022",
    "uri": "model:anthropic/text/core:3.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/anthropic/claude-3-5-sonnet-20241022.toml",
    "current": false
  },
  {
    "id": "anthropic/claude-3-7-sonnet-20250219",
    "uri": "model:anthropic/text/core:3.7",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/anthropic/claude-3-7-sonnet-20250219.toml",
    "current": false
  },
  {
    "id": "anthropic/claude-sonnet-4-0",
    "uri": "model:anthropic/text/core:4",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/anthropic/claude-sonnet-4-0.toml",
    "current": false
  },
  {
    "id": "anthropic/claude-sonnet-4-5",
    "uri": "model:anthropic/text/core:4.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/anthropic/claude-sonnet-4-5.toml",
    "current": false
  },
  {
    "id": "anthropic/claude-sonnet-4-6",
    "uri": "model:anthropic/text/core:4.6",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/128615ddd7b1a39812fc7d17cf731307dacf1bec/providers/anthropic/models/claude-sonnet-4-6.toml",
    "current": false
  },
  {
    "id": "anthropic/claude-sonnet-5",
    "uri": "model:anthropic/text/core:5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/486f75b371490ec33adbb60c532c1007221d40af/providers/anthropic/models/claude-sonnet-5.toml",
    "current": false
  },
  {
    "id": "anthropic/claude-sonnet-5-5",
    "uri": "model:anthropic/text/core:5.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/3a3d83e481d959331605c5c8374a1fe7cc803cb4/providers/anthropic/models/claude-sonnet-5-5.toml",
    "current": true
  },
  {
    "id": "anthropic/claude-opus-5",
    "uri": "model:anthropic/text/high:5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/342b5572a06735d0efa8c3c419589051199459d8/providers/anthropic/models/claude-opus-5.toml",
    "current": false
  },
  {
    "id": "anthropic/claude-opus-5-5",
    "uri": "model:anthropic/text/high:5.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/1ba7a9dff9a2be54e824d7211475b8d9d3b4c5de/providers/anthropic/models/claude-opus-5-5.toml",
    "current": true
  },
  {
    "id": "anthropic/claude-3-haiku-20240307",
    "uri": "model:anthropic/text/light:3",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/anthropic/claude-3-haiku-20240307.toml",
    "current": false
  },
  {
    "id": "anthropic/claude-3-5-haiku-20241022",
    "uri": "model:anthropic/text/light:3.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/anthropic/claude-3-5-haiku-20241022.toml",
    "current": false
  },
  {
    "id": "anthropic/claude-haiku-4-5",
    "uri": "model:anthropic/text/light:4.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/anthropic/claude-haiku-4-5.toml",
    "current": false
  },
  {
    "id": "anthropic/claude-haiku-5-5",
    "uri": "model:anthropic/text/light:5.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/bde18f10ee3da7d5eb4cc07bfd3d374a93a8f025/providers/anthropic/models/claude-haiku-5-5.toml",
    "current": true
  },
  {
    "id": "anthropic/claude-opus-4-0",
    "uri": "model:anthropic/text/ultra:4",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/anthropic/claude-opus-4-0.toml",
    "current": false
  },
  {
    "id": "anthropic/claude-opus-4-1",
    "uri": "model:anthropic/text/ultra:4.1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/anthropic/claude-opus-4-1.toml",
    "current": false
  },
  {
    "id": "anthropic/claude-opus-4-5",
    "uri": "model:anthropic/text/ultra:4.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/anthropic/claude-opus-4-5.toml",
    "current": false
  },
  {
    "id": "anthropic/claude-opus-4-6",
    "uri": "model:anthropic/text/ultra:4.6",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/61c8d50df21422b2d84990c2e61ddce1d2bd58b2/providers/anthropic/models/claude-opus-4-6.toml",
    "current": false
  },
  {
    "id": "anthropic/claude-opus-4-7",
    "uri": "model:anthropic/text/ultra:4.7",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/2f954fc83804884368081cfb6820804eab620a1e/providers/anthropic/models/claude-opus-4-7.toml",
    "current": false
  },
  {
    "id": "anthropic/claude-opus-4-8",
    "uri": "model:anthropic/text/ultra:4.8",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/1c71b1bf177f16268b4f728ad4cfbe57e0c57c77/providers/anthropic/models/claude-opus-4-8.toml",
    "current": false
  },
  {
    "id": "anthropic/claude-fable-5",
    "uri": "model:anthropic/text/ultra:5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/259aff58eb67f6b5f2ef3841c887cd8d8ffb2120/providers/anthropic/models/claude-fable-5.toml",
    "current": false
  },
  {
    "id": "anthropic/claude-fable-5-1",
    "uri": "model:anthropic/text/ultra:5.1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/bf06cd2a3ae2922acd435ddc441ca5874f93ee8a/providers/anthropic/models/claude-fable-5-1.toml",
    "current": false
  },
  {
    "id": "anthropic/claude-fable-5-2",
    "uri": "model:anthropic/text/ultra:5.2",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/20cc6a0bfceda65d7532dbe46986dee119573a8f/providers/anthropic/models/claude-fable-5-2.toml",
    "current": true
  },
  {
    "id": "arcee-ai/trinity-mini",
    "uri": "model:arcee-ai/text/core-weights/26b-a3b:1",
    "license": "OpenMDW-1.1",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/arcee-ai/Trinity-Mini",
    "current": true
  },
  {
    "id": "arcee-ai/trinity-large-thinking",
    "uri": "model:arcee-ai/text/ultra-weights:1",
    "license": "OpenMDW-1.1",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/arcee-ai/Trinity-Large-Thinking",
    "current": true
  },
  {
    "id": "arcee-ai/trinity-large-preview",
    "uri": "model:arcee-ai/text/ultra-weights:1preview",
    "license": "OpenMDW-1.1",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/arcee-ai/Trinity-Large-Preview",
    "current": false
  },
  {
    "id": "arcee-ai/trinity-nano-preview",
    "uri": "model:arcee-ai/text/nano-weights/6b-a1b:1preview",
    "license": "OpenMDW-1.1",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/arcee-ai/Trinity-Nano-Preview",
    "current": true
  },
  {
    "id": "baai/bge-m3",
    "uri": "model:baai/embed/core-open:m3",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/BAAI/bge-m3",
    "current": true
  },
  {
    "id": "baai/bge-multilingual-gemma2",
    "uri": "model:baai/embed/high-weights:gemma2",
    "license": "Gemma Terms of Use",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/BAAI/bge-multilingual-gemma2",
    "current": true
  },
  {
    "id": "baai/bge-reranker-v2-m3",
    "uri": "model:baai/rerank/core-open:2.m3",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/BAAI/bge-reranker-v2-m3",
    "current": true
  },
  {
    "id": "baidu/cobuddy",
    "uri": "model:baidu/text/core-code:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/baidu/cobuddy.toml",
    "current": true
  },
  {
    "id": "baidu/ernie-4.5-21b-a3b",
    "uri": "model:baidu/text/core-open/21b-a3b:4.5",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/baidu/ERNIE-4.5-21B-A3B-PT",
    "current": true
  },
  {
    "id": "baidu/ernie-4.5-300b-a47b",
    "uri": "model:baidu/text/ultra-open/300b-a47b:4.5",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/baidu/ERNIE-4.5-300B-A47B-Paddle",
    "current": true
  },
  {
    "id": "baidu/ernie-4.5-vl-424b-a47b",
    "uri": "model:baidu/text/ultra-open/424b-a47b:4.5",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/baidu/ERNIE-4.5-VL-424B-A47B-PT",
    "current": true
  },
  {
    "id": "black-forest-labs/flux-1-dev",
    "uri": "model:black-forest-labs/image/core-weights:1",
    "license": "FLUX.1 [dev] Non-Commercial License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/black-forest-labs/FLUX.1-dev",
    "current": true
  },
  {
    "id": "black-forest-labs/flux-1-schnell",
    "uri": "model:black-forest-labs/image/light-open:1",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/black-forest-labs/FLUX.1-schnell",
    "current": true
  },
  {
    "id": "bytedance-seed/seed-2.0-code",
    "uri": "model:bytedance-seed/text/core-code:2.0",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/bytedance-seed/seed-2.0-code.toml",
    "current": false
  },
  {
    "id": "bytedance-seed/seed-oss-36b-instruct",
    "uri": "model:bytedance-seed/text/core-open/36b:1",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/ByteDance-Seed/Seed-OSS-36B-Instruct",
    "current": true
  },
  {
    "id": "bytedance-seed/seed-character",
    "uri": "model:bytedance-seed/text/core-roleplay:26.06",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/bytedance-seed/seed-character.toml",
    "current": true
  },
  {
    "id": "bytedance-seed/seed-1-6",
    "uri": "model:bytedance-seed/text/core:1.6",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/bytedance-seed/seed-1-6.toml",
    "current": false
  },
  {
    "id": "bytedance-seed/seed-1-8",
    "uri": "model:bytedance-seed/text/core:1.8",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/bytedance-seed/seed-1-8.toml",
    "current": false
  },
  {
    "id": "bytedance-seed/seed-2.1-turbo",
    "uri": "model:bytedance-seed/text/core:2.1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/bytedance-seed/seed-2.1-turbo.toml",
    "current": true
  },
  {
    "id": "bytedance-seed/seed-1-6-flash",
    "uri": "model:bytedance-seed/text/light:1.6",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/bytedance-seed/seed-1-6-flash.toml",
    "current": false
  },
  {
    "id": "bytedance-seed/seed-2.0-lite",
    "uri": "model:bytedance-seed/text/light:2.0",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/bytedance-seed/seed-2.0-lite.toml",
    "current": false
  },
  {
    "id": "bytedance-seed/seed-2.1-lite",
    "uri": "model:bytedance-seed/text/light:2.1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/bytedance-seed/seed-2.1-lite.toml",
    "current": true
  },
  {
    "id": "bytedance-seed/seed-2.0-pro",
    "uri": "model:bytedance-seed/text/ultra:2.0",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/bytedance-seed/seed-2.0-pro.toml",
    "current": false
  },
  {
    "id": "bytedance-seed/seed-2.1-pro",
    "uri": "model:bytedance-seed/text/ultra:2.1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/bytedance-seed/seed-2.1-pro.toml",
    "current": true
  },
  {
    "id": "bytedance-seed/seed-2.0-mini",
    "uri": "model:bytedance-seed/text/nano:2.0",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/bytedance-seed/seed-2.0-mini.toml",
    "current": true
  },
  {
    "id": "bytedance-seed/seedance-2.0",
    "uri": "model:bytedance-seed/video/core:2.0",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://seed.bytedance.com/en/blog/seedance-2-0-official-launch",
    "current": false
  },
  {
    "id": "bytedance-seed/seedance-2.5",
    "uri": "model:bytedance-seed/video/core:2.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5",
    "current": true
  },
  {
    "id": "canopylabs/orpheus-v1-english",
    "uri": "model:canopylabs/tts/core:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/canopylabs/orpheus-v1-english.toml",
    "current": true
  },
  {
    "id": "cloudflare/clef",
    "uri": "model:cloudflare/decision/core-open:1",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Cloudflare/clef",
    "current": true
  },
  {
    "id": "cloudflare/clef-flash",
    "uri": "model:cloudflare/decision/light-open/9b:1",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Cloudflare/clef-flash",
    "current": true
  },
  {
    "id": "cohere/command-r-08-2024",
    "uri": "model:cohere/text/core-weights:2408",
    "license": "CC-BY-NC-4.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/CohereLabs/c4ai-command-r-08-2024",
    "current": true
  },
  {
    "id": "cohere/c4ai-aya-expanse-32b",
    "uri": "model:cohere/text/high-weights/32b:1",
    "license": "CC-BY-NC-4.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/CohereLabs/aya-expanse-32b",
    "current": true
  },
  {
    "id": "cohere/north-small-translate-1-0",
    "uri": "model:cohere/text/light-translate-weights:1.0",
    "license": "CC-BY-NC-4.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/CohereLabs/North-Small-Translate-1.0",
    "current": true
  },
  {
    "id": "cohere/tiny-aya-global",
    "uri": "model:cohere/text/light-weights:1",
    "license": "CC-BY-NC-4.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/CohereLabs/tiny-aya-global",
    "current": true
  },
  {
    "id": "cohere/c4ai-aya-expanse-8b",
    "uri": "model:cohere/text/light-weights/8b:1",
    "license": "CC-BY-NC-4.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/CohereLabs/aya-expanse-8b",
    "current": true
  },
  {
    "id": "cohere/command-r-plus-08-2024",
    "uri": "model:cohere/text/ultra-weights:2408",
    "license": "CC-BY-NC-4.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/CohereLabs/c4ai-command-r-plus-08-2024",
    "current": false
  },
  {
    "id": "cohere/command-a-03-2025",
    "uri": "model:cohere/text/ultra-weights:2503",
    "license": "CC-BY-NC-4.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/CohereLabs/c4ai-command-a-03-2025",
    "current": true
  },
  {
    "id": "cohere/command-r7b-12-2024",
    "uri": "model:cohere/text/nano-weights/7b:2412",
    "license": "CC-BY-NC-4.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/CohereLabs/c4ai-command-r7b-12-2024",
    "current": true
  },
  {
    "id": "cohere/command-a-plus-05-2026",
    "uri": "model:cohere/text/ultra-open:2605",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/CohereLabs/command-a-plus-05-2026-bf16",
    "current": true
  },
  {
    "id": "cohere/north-mini-code-1-0",
    "uri": "model:cohere/text/light-code-open:1.0",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/CohereLabs/North-Mini-Code-1.0",
    "current": true
  },
  {
    "id": "deepreinforce/ornith-1.5-35b-a3b",
    "uri": "model:deepreinforce/text/core-code-open/35b-a3b:1.5",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/ornith-ai/Ornith-1.5-35B-A3B",
    "current": true
  },
  {
    "id": "deepreinforce/ornith-1.0-35b",
    "uri": "model:deepreinforce/text/high-code-open/35b:1.0",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/deepreinforce-ai/Ornith-1.0-35B",
    "current": true
  },
  {
    "id": "deepreinforce/ornith-1.0-9b",
    "uri": "model:deepreinforce/text/light-code-open/9b:1.0",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/deepreinforce-ai/Ornith-1.0-9B",
    "current": true
  },
  {
    "id": "deepreinforce/ornith-1.5-122b",
    "uri": "model:deepreinforce/text/ultra-code-open:1.5",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/deepreinforce/ornith-1.5-122b.toml",
    "current": true
  },
  {
    "id": "deepreinforce/ornith-1.0-397b",
    "uri": "model:deepreinforce/text/ultra-code-open/397b:1.0",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/deepreinforce-ai/Ornith-1.0-397B",
    "current": false
  },
  {
    "id": "deepseek/deepseek-v3-0324",
    "uri": "model:deepseek/text/core-open:3.0324",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/deepseek-ai/DeepSeek-V3-0324",
    "current": false
  },
  {
    "id": "deepseek/deepseek-v3.1",
    "uri": "model:deepseek/text/core-open:3.1",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/deepseek-ai/DeepSeek-V3.1",
    "current": false
  },
  {
    "id": "deepseek/deepseek-v3.2",
    "uri": "model:deepseek/text/core-open:3.2",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/deepseek-ai/DeepSeek-V3.2",
    "current": true
  },
  {
    "id": "deepseek/deepseek-v3",
    "uri": "model:deepseek/text/core-weights:3",
    "license": "DeepSeek Model License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/deepseek-ai/DeepSeek-V3",
    "current": true
  },
  {
    "id": "deepseek/deepseek-v4-flash",
    "uri": "model:deepseek/text/light-open:4",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash",
    "current": false
  },
  {
    "id": "deepseek/deepseek-v4.1-flash",
    "uri": "model:deepseek/text/light-open:4.1",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash",
    "current": true
  },
  {
    "id": "deepseek/deepseek-v4-pro",
    "uri": "model:deepseek/text/ultra-open:4",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro",
    "current": true
  },
  {
    "id": "deepseek/deepseek-r1",
    "uri": "model:deepseek/text/ultra-open:r1",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/deepseek-ai/DeepSeek-R1",
    "current": false
  },
  {
    "id": "deepseek/deepseek-r1-0528",
    "uri": "model:deepseek/text/ultra-open:r1.0528",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/deepseek-ai/DeepSeek-R1-0528",
    "current": false
  },
  {
    "id": "deepseek/deepseek-ocr-2",
    "uri": "model:deepseek/text/core-ocr-open:2",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/deepseek-ai/DeepSeek-OCR-2",
    "current": true
  },
  {
    "id": "essentialai/rnj-1-instruct",
    "uri": "model:essentialai/text/core-open/8b:1",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/EssentialAI/rnj-1-instruct",
    "current": true
  },
  {
    "id": "google/lyria-3-pro-preview",
    "uri": "model:google/audio/core:3",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/lyria-3-pro-preview.toml",
    "current": true
  },
  {
    "id": "google/lyria-3-clip-preview",
    "uri": "model:google/audio/light:3",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/lyria-3-clip-preview.toml",
    "current": true
  },
  {
    "id": "google/gemini-embedding-001",
    "uri": "model:google/embed/core:001",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemini-embedding-001.toml",
    "current": false
  },
  {
    "id": "google/gemini-embedding-2",
    "uri": "model:google/embed/core:2",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemini-embedding-2.toml",
    "current": true
  },
  {
    "id": "google/gemini-2.5-flash-image",
    "uri": "model:google/image/core:2.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemini-2.5-flash-image.toml",
    "current": false
  },
  {
    "id": "google/gemini-3.1-flash-image",
    "uri": "model:google/image/core:3.1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemini-3.1-flash-image.toml",
    "current": true
  },
  {
    "id": "google/gemini-3.1-flash-lite-image",
    "uri": "model:google/image/light:3.1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemini-3.1-flash-lite-image.toml",
    "current": true
  },
  {
    "id": "google/gemini-3-pro-image",
    "uri": "model:google/image/ultra:3",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemini-3-pro-image.toml",
    "current": true
  },
  {
    "id": "google/gemini-3.1-flash-live-preview",
    "uri": "model:google/omni/core-rt:3.1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemini-3.1-flash-live-preview.toml",
    "current": true
  },
  {
    "id": "google/gemini-3.5-live-translate-preview",
    "uri": "model:google/omni/core-translate:3.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemini-3.5-live-translate-preview.toml",
    "current": true
  },
  {
    "id": "google/gemini-2.5-computer-use-preview-10-2025",
    "uri": "model:google/text/core-gui:2.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemini-2.5-computer-use-preview-10-2025.toml",
    "current": true
  },
  {
    "id": "google/gemma-4-26b-a4b-it",
    "uri": "model:google/text/core-open/26b-a4b:4",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/google/gemma-4-26B-A4B-it",
    "current": true
  },
  {
    "id": "google/deep-research-preview-04-2026",
    "uri": "model:google/text/core-research:2026.04",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/deep-research-preview-04-2026.toml",
    "current": true
  },
  {
    "id": "google/gemini-robotics-er-1.6-preview",
    "uri": "model:google/text/core-robotics:1.6",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemini-robotics-er-1.6-preview.toml",
    "current": true
  },
  {
    "id": "google/gemma-3-12b-it",
    "uri": "model:google/text/core-weights/12b:3",
    "license": "Gemma Terms of Use",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/google/gemma-3-12b-it",
    "current": false
  },
  {
    "id": "google/gemini-2.0-flash",
    "uri": "model:google/text/core:2.0",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemini-2.0-flash.toml",
    "current": false
  },
  {
    "id": "google/gemini-2.5-flash",
    "uri": "model:google/text/core:2.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemini-2.5-flash.toml",
    "current": false
  },
  {
    "id": "google/gemini-3.5-flash",
    "uri": "model:google/text/core:3.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/462c7877d9a701d03165c36043e536410eded886/providers/google/models/gemini-3.5-flash.toml",
    "current": false
  },
  {
    "id": "google/gemini-4-hydrogen",
    "uri": "model:google/text/core:4",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/736acb896c605c1fbafb31f17d40c9dae8c93ebf/providers/google/models/gemini-4-hydrogen.toml",
    "current": true
  },
  {
    "id": "google/gemini-4-neon",
    "uri": "model:google/text/high:4",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/af07617a53ad7356cb355ce5a4fcc7e30efffb92/providers/google/models/gemini-4-neon.toml",
    "current": true
  },
  {
    "id": "google/gemma-4-12b-it",
    "uri": "model:google/text/light-open/12b:4",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/google/gemma-4-12B-it",
    "current": true
  },
  {
    "id": "google/gemma-3-4b-it",
    "uri": "model:google/text/light-weights/4b:3",
    "license": "Gemma Terms of Use",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/google/gemma-3-4b-it",
    "current": false
  },
  {
    "id": "google/gemini-3-flash-preview",
    "uri": "model:google/text/light:3",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemini-3-flash-preview.toml",
    "current": false
  },
  {
    "id": "google/gemini-3.6-flash",
    "uri": "model:google/text/light:3.6",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/7a344d915594369b0cea32cc64c61699cdf20095/providers/google/models/gemini-3.6-flash.toml",
    "current": false
  },
  {
    "id": "google/gemini-3.7-flash",
    "uri": "model:google/text/light:3.7",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/0012011936a24dcd24b0d4242ed9be27e2b77495/providers/google/models/gemini-3.7-flash.toml",
    "current": false
  },
  {
    "id": "google/gemini-3.8-flash",
    "uri": "model:google/text/light:3.8",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/552d456df7a35929cff2c1a9595ed7b48fe0f0e5/providers/google/models/gemini-3.8-flash.toml",
    "current": true
  },
  {
    "id": "google/gemma-4-31b-it",
    "uri": "model:google/text/ultra-open/31b:4",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/google/gemma-4-31B-it",
    "current": true
  },
  {
    "id": "google/deep-research-max-preview-04-2026",
    "uri": "model:google/text/ultra-research:2026.04",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/deep-research-max-preview-04-2026.toml",
    "current": true
  },
  {
    "id": "google/gemma-3-27b-it",
    "uri": "model:google/text/ultra-weights/27b:3",
    "license": "Gemma Terms of Use",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/google/gemma-3-27b-it",
    "current": false
  },
  {
    "id": "google/gemini-2.5-pro",
    "uri": "model:google/text/ultra:2.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemini-2.5-pro.toml",
    "current": false
  },
  {
    "id": "google/gemini-3-pro-preview",
    "uri": "model:google/text/ultra:3",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemini-3-pro-preview.toml",
    "current": false
  },
  {
    "id": "google/gemini-3.1-pro-preview",
    "uri": "model:google/text/ultra:3.1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemini-3.1-pro-preview.toml",
    "current": false
  },
  {
    "id": "google/gemini-4-carbon",
    "uri": "model:google/text/ultra:4",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/ca0dc2a7341b733fc30aa21831333632e615ea65/providers/google/models/gemini-4-carbon.toml",
    "current": true
  },
  {
    "id": "google/gemma-2-2b-it",
    "uri": "model:google/text/nano-weights/2b:2",
    "license": "Gemma Terms of Use",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemma-2-2b-it.toml",
    "current": false
  },
  {
    "id": "google/gemini-2.0-flash-lite",
    "uri": "model:google/text/nano:2.0",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemini-2.0-flash-lite.toml",
    "current": false
  },
  {
    "id": "google/gemini-2.5-flash-lite",
    "uri": "model:google/text/nano:2.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemini-2.5-flash-lite.toml",
    "current": false
  },
  {
    "id": "google/gemini-3.1-flash-lite",
    "uri": "model:google/text/nano:3.1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/92e19432d3611dbbcb9f73a3011786d35e597a3d/providers/google/models/gemini-3.1-flash-lite.toml",
    "current": false
  },
  {
    "id": "google/gemini-3.5-flash-lite",
    "uri": "model:google/text/nano:3.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/7a344d915594369b0cea32cc64c61699cdf20095/providers/google/models/gemini-3.5-flash-lite.toml",
    "current": false
  },
  {
    "id": "google/gemini-4-argon",
    "uri": "model:google/text/max:4",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/0da444719383739ca9d06adbcd429b508eac80d3/providers/google/models/gemini-4-argon.toml",
    "current": true
  },
  {
    "id": "google/gemini-3.5-transcribe-live",
    "uri": "model:google/transcribe/core-rt:3.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemini-3.5-transcribe-live.toml",
    "current": true
  },
  {
    "id": "google/gemini-2.5-flash-tts",
    "uri": "model:google/tts/core:2.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemini-2.5-flash-tts.toml",
    "current": false
  },
  {
    "id": "google/gemini-3.1-flash-tts-preview",
    "uri": "model:google/tts/core:3.1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemini-3.1-flash-tts-preview.toml",
    "current": true
  },
  {
    "id": "google/gemini-2.5-pro-tts",
    "uri": "model:google/tts/high:2.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemini-2.5-pro-tts.toml",
    "current": true
  },
  {
    "id": "google/veo-3.1-generate-preview",
    "uri": "model:google/video/core:3.1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/veo-3.1-generate-preview.toml",
    "current": true
  },
  {
    "id": "google/veo-3.1-lite-generate-preview",
    "uri": "model:google/video/light:3.1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/veo-3.1-lite-generate-preview.toml",
    "current": true
  },
  {
    "id": "google/gemma-2-27b-it",
    "uri": "model:google/text/ultra-weights/27b:2",
    "license": "Gemma Terms of Use",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/google/gemma-2-27b-it",
    "current": false
  },
  {
    "id": "ibm/granite-4-h-small",
    "uri": "model:ibm/text/core-open:4.0",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/ibm-granite/granite-4.0-h-small",
    "current": true
  },
  {
    "id": "ibm/granite-4-h-micro",
    "uri": "model:ibm/text/light-open:4.0",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/ibm-granite/granite-4.0-h-micro",
    "current": false
  },
  {
    "id": "ibm/granite-4.2-8b",
    "uri": "model:ibm/text/light-open:4.2",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/ibm-granite/granite-4.2-8b",
    "current": true
  },
  {
    "id": "inception/mercury-edit-2",
    "uri": "model:inception/text/core-code:2",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/inception/mercury-edit-2.toml",
    "current": true
  },
  {
    "id": "inception/mercury-2",
    "uri": "model:inception/text/core:2",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/inception/mercury-2.toml",
    "current": false
  },
  {
    "id": "inception/mercury-2.5",
    "uri": "model:inception/text/core:2.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/inception/mercury-2.5.toml",
    "current": false
  },
  {
    "id": "inception/mercury-3",
    "uri": "model:inception/text/core:3",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/inception/mercury-3.toml",
    "current": true
  },
  {
    "id": "inclusionai/ling-3.0-flash-fin",
    "uri": "model:inclusionai/text/core-finance-open:3.0",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/inclusionAI/Ling-3.0-flash-Fin",
    "current": true
  },
  {
    "id": "inclusionai/ling-3.0-flash-sante",
    "uri": "model:inclusionai/text/core-medical:3.0",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/inclusionai/ling-3.0-flash-sante.toml",
    "current": true
  },
  {
    "id": "inclusionai/ling-3.0-flash",
    "uri": "model:inclusionai/text/core-open:3.0",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/inclusionAI/Ling-3.0-flash",
    "current": false
  },
  {
    "id": "inclusionai/ling-3.2-flash",
    "uri": "model:inclusionai/text/core:3.2",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/inclusionai/ling-3.2-flash.toml",
    "current": true
  },
  {
    "id": "inclusionai/ling-3.0-tiny",
    "uri": "model:inclusionai/text/nano-open:3.0",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/inclusionAI/Ling-3.0-tiny",
    "current": true
  },
  {
    "id": "inclusionai/ling-3.1-flash",
    "uri": "model:inclusionai/text/core-open:3.1",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/inclusionAI/Ling-3.1-flash",
    "current": true
  },
  {
    "id": "inclusionai/lingsante-3.1-air-vl",
    "uri": "model:inclusionai/text/core-medical-open:3.1",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/inclusionAI/LingSante-3.1-air-VL",
    "current": true
  },
  {
    "id": "inference-net/schematron-v2-small",
    "uri": "model:inference-net/text/core:2",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/inference-net/schematron-v2-small.toml",
    "current": true
  },
  {
    "id": "inference-net/schematron-v2-turbo",
    "uri": "model:inference-net/text/light:2",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/inference-net/schematron-v2-turbo.toml",
    "current": true
  },
  {
    "id": "lightonai/lightonocr-3-0.8b",
    "uri": "model:lightonai/text/core-ocr-open/0.8b:3",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/lightonai/LightOnOCR-3-0.8B",
    "current": true
  },
  {
    "id": "lightonai/lightonocr-2-1b",
    "uri": "model:lightonai/text/core-ocr-open/1b:2",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/lightonai/LightOnOCR-2-1B",
    "current": false
  },
  {
    "id": "liquid/d1",
    "uri": "model:liquid/decision/core:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/liquid/d1.toml",
    "current": false,
    "former_native": { "vercel": "liquid/d1" }
  },
  {
    "id": "liquid/lfm2-24b-a2b",
    "uri": "model:liquid/text/core-weights/24b-a2b:2",
    "license": "LFM Open License v1.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/LiquidAI/LFM2-24B-A2B",
    "current": true
  },
  {
    "id": "meituan/longcat-2.5",
    "uri": "model:meituan/text/core:2.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/meituan/longcat-2.5.toml",
    "current": true
  },
  {
    "id": "meituan/longcat-2.5-preview",
    "uri": "model:meituan/text/core:2.5preview",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/meituan/longcat-2.5-preview.toml",
    "current": false
  },
  {
    "id": "meituan/longcat-2.0",
    "uri": "model:meituan/text/core-open:2.0",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/meituan-longcat/LongCat-2.0",
    "current": true
  },
  {
    "id": "meragpt/restyler-1",
    "uri": "model:meragpt/text/core:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/meragpt/restyler-1.toml",
    "current": true
  },
  {
    "id": "meta/llama-guard-4-12b",
    "uri": "model:meta/text/core-guard-weights/12b:4",
    "license": "Llama 4 Community License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/meta-llama/Llama-Guard-4-12B",
    "current": true
  },
  {
    "id": "meta/llama-guard-3-8b",
    "uri": "model:meta/text/core-guard-weights/8b:3",
    "license": "Llama 3.1 Community License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/meta-llama/Llama-Guard-3-8B",
    "current": true
  },
  {
    "id": "meta/llama-4-maverick-17b-instruct",
    "uri": "model:meta/text/core-weights:4",
    "license": "Llama 4 Community License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/meta-llama/Llama-4-Maverick-17B-128E-Instruct",
    "current": true
  },
  {
    "id": "meta/muse-spark-open",
    "uri": "model:meta/text/core-weights/816b-a42b:1.0",
    "license": "Muse Model License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B",
    "current": true
  },
  {
    "id": "meta/muse-spark-1.1",
    "uri": "model:meta/text/core:1.1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/meta/muse-spark-1.1.toml",
    "current": false
  },
  {
    "id": "meta/muse-spark-1.2",
    "uri": "model:meta/text/core:1.2",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/meta/muse-spark-1.2.toml",
    "current": false
  },
  {
    "id": "meta/muse-spark-1.3",
    "uri": "model:meta/text/core:1.3",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/meta/muse-spark-1.3.toml",
    "current": true
  },
  {
    "id": "meta/llama-3.1-70b-instruct",
    "uri": "model:meta/text/high-weights/70b:3.1",
    "license": "Llama 3.1 Community License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/meta-llama/Llama-3.1-70B-Instruct",
    "current": false
  },
  {
    "id": "meta/llama-3.3-70b-instruct",
    "uri": "model:meta/text/high-weights/70b:3.3",
    "license": "Llama 3.3 Community License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct",
    "current": true
  },
  {
    "id": "meta/llama-3.2-90b-vision-instruct",
    "uri": "model:meta/text/high-weights/90b:3.2",
    "license": "Llama 3.2 Community License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/meta-llama/Llama-3.2-90B-Vision-Instruct",
    "current": true
  },
  {
    "id": "meta/muse-glimmer-30b",
    "uri": "model:meta/text/light-open/30b:1.0",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/meta-models/Muse-Glimmer-30B",
    "current": true
  },
  {
    "id": "meta/llama-4-scout-17b-instruct",
    "uri": "model:meta/text/light-weights:4",
    "license": "Llama 4 Community License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/meta-llama/Llama-4-Scout-17B-16E-Instruct",
    "current": true
  },
  {
    "id": "meta/llama-3.2-11b-vision-instruct",
    "uri": "model:meta/text/light-weights/11b:3.2",
    "license": "Llama 3.2 Community License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/meta-llama/Llama-3.2-11B-Vision-Instruct",
    "current": true
  },
  {
    "id": "meta/llama-3.1-8b-instruct",
    "uri": "model:meta/text/light-weights/8b:3.1",
    "license": "Llama 3.1 Community License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct",
    "current": true
  },
  {
    "id": "meta/muse-ember-1.0",
    "uri": "model:meta/text/light:1.0",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://research.meta.ai/blog/muse-ember",
    "current": true
  },
  {
    "id": "meta/muse-wonder-1.0",
    "uri": "model:meta/text/ultra:1.0",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://research.meta.ai/blog/muse-wonder",
    "current": true
  },
  {
    "id": "meta/llama-3.2-1b",
    "uri": "model:meta/text/nano-base-weights/1b:3.2",
    "license": "Llama 3.2 Community License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/meta-llama/Llama-3.2-1B",
    "current": true
  },
  {
    "id": "meta/llama-3.2-3b",
    "uri": "model:meta/text/nano-base-weights/3b:3.2",
    "license": "Llama 3.2 Community License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/meta-llama/Llama-3.2-3B",
    "current": true
  },
  {
    "id": "meta/llama-prompt-guard-2-22m",
    "uri": "model:meta/text/nano-guard-weights/22m:2",
    "license": "Llama 4 Community License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/meta-llama/Llama-Prompt-Guard-2-22M",
    "current": true
  },
  {
    "id": "meta/llama-prompt-guard-2-86m",
    "uri": "model:meta/text/nano-guard-weights/86m:2",
    "license": "Llama 4 Community License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/meta-llama/Llama-Prompt-Guard-2-86M",
    "current": true
  },
  {
    "id": "meta/llama-3.2-1b-instruct",
    "uri": "model:meta/text/nano-weights/1b:3.2",
    "license": "Llama 3.2 Community License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/meta-llama/Llama-3.2-1B-Instruct",
    "current": true
  },
  {
    "id": "meta/llama-3.2-3b-instruct",
    "uri": "model:meta/text/nano-weights/3b:3.2",
    "license": "Llama 3.2 Community License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/meta-llama/Llama-3.2-3B-Instruct",
    "current": true
  },
  {
    "id": "microsoft/mai-code-2",
    "uri": "model:microsoft/text/core-code:2",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://microsoft.ai/news/introducing-mai-code-2-and-mai-code-2-flash/",
    "current": true
  },
  {
    "id": "microsoft/phi-4-multimodal-instruct",
    "uri": "model:microsoft/text/core-open:4",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/microsoft/Phi-4-multimodal-instruct",
    "current": true
  },
  {
    "id": "microsoft/mai-code-1.1-flash",
    "uri": "model:microsoft/text/light-code:1.1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://microsoft.ai/news/mai-code-1-1-flash-br-better-faster-at-a-quarter-of-the-cost/",
    "current": false
  },
  {
    "id": "microsoft/mai-code-2-flash",
    "uri": "model:microsoft/text/light-code:2",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://microsoft.ai/news/introducing-mai-code-2-and-mai-code-2-flash/",
    "current": true
  },
  {
    "id": "microsoft/phi-4-mini",
    "uri": "model:microsoft/text/light-open:4",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/microsoft/Phi-4-mini-instruct",
    "current": true
  },
  {
    "id": "minimax/minimax-m1-80k",
    "uri": "model:minimax/text/core-open:1",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/MiniMaxAI/MiniMax-M1-80k",
    "current": true
  },
  {
    "id": "minimax/MiniMax-M2-Her",
    "uri": "model:minimax/text/core-roleplay:2",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/minimax/MiniMax-M2-Her.toml",
    "current": true
  },
  {
    "id": "minimax/MiniMax-M2",
    "uri": "model:minimax/text/core-weights:2",
    "license": "Modified MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/MiniMaxAI/MiniMax-M2",
    "current": false
  },
  {
    "id": "minimax/MiniMax-M2.1",
    "uri": "model:minimax/text/core-weights:2.1",
    "license": "Modified MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/MiniMaxAI/MiniMax-M2.1",
    "current": false
  },
  {
    "id": "minimax/MiniMax-M2.5",
    "uri": "model:minimax/text/core-weights:2.5",
    "license": "Modified MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/MiniMaxAI/MiniMax-M2.5",
    "current": false
  },
  {
    "id": "minimax/MiniMax-M3",
    "uri": "model:minimax/text/core-weights:3",
    "license": "MiniMax Community License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/MiniMaxAI/MiniMax-M3",
    "current": true
  },
  {
    "id": "minimax/MiniMax-M3.1-Flash",
    "uri": "model:minimax/text/light-weights:3.1",
    "license": "MiniMax Community License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/MiniMaxAI/MiniMax-M3.1-Flash",
    "current": true
  },
  {
    "id": "minimax/MiniMax-H3",
    "uri": "model:minimax/video/core-weights:3",
    "license": "MiniMax H3 Community License Agreement",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/MiniMaxAI/MiniMax-H3",
    "current": true
  },
  {
    "id": "mistral/mistral-embed",
    "uri": "model:mistral/embed/core:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/mistral/mistral-embed.toml",
    "current": true
  },
  {
    "id": "mistral/codestral-22b-v0.1",
    "uri": "model:mistral/text/core-code-weights/22b:0.1",
    "license": "Mistral AI Non-Production License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/mistralai/Codestral-22B-v0.1",
    "current": true
  },
  {
    "id": "mistral/codestral-2508",
    "uri": "model:mistral/text/core-code:25.08",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/mistral/codestral-2508.toml",
    "current": true
  },
  {
    "id": "mistral/mistral-small-2603",
    "uri": "model:mistral/text/core-open:4",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/mistralai/Mistral-Small-4-119B-2603",
    "current": true
  },
  {
    "id": "mistral/mistral-small-3-1-24b-instruct-2503",
    "uri": "model:mistral/text/core-open/24b:3.1",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/mistralai/Mistral-Small-3.1-24B-Instruct-2503",
    "current": false
  },
  {
    "id": "mistral/mistral-small-2506",
    "uri": "model:mistral/text/core-open/24b:3.2",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/mistralai/Mistral-Small-3.2-24B-Instruct-2506",
    "current": false
  },
  {
    "id": "mistral/mistral-saba",
    "uri": "model:mistral/text/core:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/mistral/mistral-saba.toml",
    "current": false
  },
  {
    "id": "mistral/magistral-small-2506",
    "uri": "model:mistral/text/high-open:1",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/mistralai/Magistral-Small-2506",
    "current": false
  },
  {
    "id": "mistral/magistral-small-2509",
    "uri": "model:mistral/text/high-open:1.2",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/mistralai/Magistral-Small-2509",
    "current": true
  },
  {
    "id": "mistral/mistral-medium-3",
    "uri": "model:mistral/text/high:3",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/mistral/mistral-medium-3.toml",
    "current": false
  },
  {
    "id": "mistral/mistral-medium-3.1",
    "uri": "model:mistral/text/high:3.1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/mistral/mistral-medium-3.1.toml",
    "current": false
  },
  {
    "id": "mistral/mistral-medium-3-5",
    "uri": "model:mistral/text/high:3.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/mistral/mistral-medium-3-5.toml",
    "current": true
  },
  {
    "id": "mistral/devstral-small-2",
    "uri": "model:mistral/text/light-code-open:2",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/mistralai/Devstral-Small-2-24B-Instruct-2512",
    "current": true
  },
  {
    "id": "mistral/devstral-small-2507",
    "uri": "model:mistral/text/light-code-open:2507",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/mistralai/Devstral-Small-2507",
    "current": false
  },
  {
    "id": "mistral/mistral-nemo",
    "uri": "model:mistral/text/light-open:2407",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/mistralai/Mistral-Nemo-Instruct-2407",
    "current": false
  },
  {
    "id": "mistral/pixtral-12b",
    "uri": "model:mistral/text/light-open/12b:2409",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/mistralai/Pixtral-12B-2409",
    "current": false
  },
  {
    "id": "mistral/ministral-3-14b-instruct-2512",
    "uri": "model:mistral/text/light-open/14b:3",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/mistralai/Ministral-3-14B-Instruct-2512",
    "current": true
  },
  {
    "id": "mistral/mistral-7b-instruct-v0.3",
    "uri": "model:mistral/text/light-open/7b:0.3",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.3",
    "current": false
  },
  {
    "id": "mistral/ministral-3-8b-instruct-2512",
    "uri": "model:mistral/text/light-open/8b:3",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/mistralai/Ministral-3-8B-Instruct-2512",
    "current": true
  },
  {
    "id": "mistral/ministral-8b-instruct-2410",
    "uri": "model:mistral/text/light-weights/8b:2410",
    "license": "Mistral Research License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/mistralai/Ministral-8B-Instruct-2410",
    "current": false
  },
  {
    "id": "mistral/mistral-large-2512",
    "uri": "model:mistral/text/ultra-open:3",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/mistralai/Mistral-Large-3-675B-Instruct-2512",
    "current": true
  },
  {
    "id": "mistral/mistral-large-2407",
    "uri": "model:mistral/text/ultra-weights:2",
    "license": "Mistral Research License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/mistralai/Mistral-Large-Instruct-2407",
    "current": false
  },
  {
    "id": "mistral/mistral-large-2411",
    "uri": "model:mistral/text/ultra-weights:2.1",
    "license": "Mistral Research License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/mistralai/Mistral-Large-Instruct-2411",
    "current": false
  },
  {
    "id": "mistral/mistral-large",
    "uri": "model:mistral/text/ultra:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/mistral/mistral-large.toml",
    "current": false
  },
  {
    "id": "mistral/mistral-large-4",
    "uri": "model:mistral/text/ultra:4",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/mistral/mistral-large-4.toml",
    "current": true
  },
  {
    "id": "mistral/ministral-3-3b-instruct-2512",
    "uri": "model:mistral/text/nano-open/3b:3",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/mistralai/Ministral-3-3B-Instruct-2512",
    "current": true
  },
  {
    "id": "mistral/mistral-small-24b-instruct-2501",
    "uri": "model:mistral/text/core-open/24b:3",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/mistralai/Mistral-Small-24B-Instruct-2501",
    "current": false
  },
  {
    "id": "mixedbread/toast-1",
    "uri": "model:mixedbread/text/core:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/mixedbread/toast-1.toml",
    "current": true
  },
  {
    "id": "moonshotai/kimi-k2.7-code",
    "uri": "model:moonshotai/text/core-code-weights:2.7",
    "license": "Modified MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/moonshotai/Kimi-K2.7-Code",
    "current": true
  },
  {
    "id": "moonshotai/kimi-k2.8-preview",
    "uri": "model:moonshotai/text/core-code:2.8",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/moonshotai/kimi-k2.8-preview.toml",
    "current": true
  },
  {
    "id": "moonshotai/kimi-k2-instruct",
    "uri": "model:moonshotai/text/core-weights:2",
    "license": "Modified MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/moonshotai/Kimi-K2-Instruct",
    "current": false
  },
  {
    "id": "moonshotai/kimi-k2-0905",
    "uri": "model:moonshotai/text/core-weights:2.0905",
    "license": "Modified MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/moonshotai/Kimi-K2-Instruct-0905",
    "current": false
  },
  {
    "id": "moonshotai/kimi-k2.5",
    "uri": "model:moonshotai/text/core-weights:2.5",
    "license": "Modified MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/moonshotai/Kimi-K2.5",
    "current": false
  },
  {
    "id": "moonshotai/kimi-k2.6",
    "uri": "model:moonshotai/text/core-weights:2.6",
    "license": "Modified MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/moonshotai/Kimi-K2.6",
    "current": true
  },
  {
    "id": "moonshotai/kimi-k3.1-pro",
    "uri": "model:moonshotai/text/ultra-weights:3.1",
    "license": "Kimi K3.1-Pro License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/moonshotai/Kimi-K3.1-Pro",
    "current": true
  },
  {
    "id": "moonshotai/kimi-k3",
    "uri": "model:moonshotai/text/ultra-weights:3",
    "license": "Kimi K3 License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/moonshotai/Kimi-K3",
    "current": false
  },
  {
    "id": "morph/morph-v3-fast",
    "uri": "model:morph/text/light:3",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/morph/morph-v3-fast.toml",
    "current": true
  },
  {
    "id": "morph/morph-v3-large",
    "uri": "model:morph/text/ultra:3",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/morph/morph-v3-large.toml",
    "current": true
  },
  {
    "id": "motif-technologies/motif-3",
    "uri": "model:motif-technologies/text/core-open/314b-a13.2b:3",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Motif-Technologies/Motif-3",
    "current": true
  },
  {
    "id": "nace-ai/drex-v1.5",
    "uri": "model:nace-ai/decision/core-weights:1.5",
    "license": "Nace.AI Open RAIL-M",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/nace-ai/drex-v1.5",
    "current": false
  },
  {
    "id": "nace-ai/drex-v2.0",
    "uri": "model:nace-ai/decision/core-weights/35b-a3b:2.0",
    "license": "Nace.AI Open RAIL-M",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/nace-ai/drex-v2.0",
    "current": true
  },
  {
    "id": "nex-agi/nex-n2-pro",
    "uri": "model:nex-agi/text/core-open/397b-a17b:2",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/nex-agi/Nex-N2-Pro",
    "current": true
  },
  {
    "id": "nvidia/llama-nemotron-embed-1b-v2",
    "uri": "model:nvidia/embed/core-weights/1b:2",
    "license": "NVIDIA Open Model License Agreement",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/nvidia/llama-nemotron-embed-1b-v2",
    "current": true
  },
  {
    "id": "nvidia/nemotron-3-ultra-550b-a55b",
    "uri": "model:nvidia/text/ultra-weights:3",
    "license": "OpenMDW-1.1",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16",
    "current": true
  },
  {
    "id": "nvidia/nemotron-3-super-120b-a12b",
    "uri": "model:nvidia/text/core-weights:3",
    "license": "NVIDIA Nemotron Open Model License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Super-120B-A12B-BF16",
    "current": false
  },
  {
    "id": "nvidia/nemotron-3.5-super-vl-120b-a12b",
    "uri": "model:nvidia/text/core-weights:3.5",
    "license": "OpenMDW-1.1",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-BF16",
    "current": true
  },
  {
    "id": "nvidia/nemotron-3-nano-30b-a3b",
    "uri": "model:nvidia/text/light-weights:3",
    "license": "NVIDIA Nemotron Open Model License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16",
    "current": false
  },
  {
    "id": "nvidia/nemotron-3.5-lightning",
    "uri": "model:nvidia/text/light-weights:3.5",
    "license": "OpenMDW-1.1",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16",
    "current": true
  },
  {
    "id": "nvidia/nemotron-nano-9b-v2",
    "uri": "model:nvidia/text/light-weights/9b:2",
    "license": "NVIDIA Open Model License Agreement",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/nvidia/NVIDIA-Nemotron-Nano-9B-v2",
    "current": true
  },
  {
    "id": "nvidia/nemotron-nano-12b-v2-vl",
    "uri": "model:nvidia/text/light-weights/12b:2",
    "license": "NVIDIA Open Model License Agreement",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/nvidia/NVIDIA-Nemotron-Nano-12B-v2-VL-BF16",
    "current": true
  },
  {
    "id": "nvidia/nemotron-mini-4b-instruct",
    "uri": "model:nvidia/text/nano-weights:1",
    "license": "NVIDIA Open Model License Agreement",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/nvidia/Nemotron-Mini-4B-Instruct",
    "current": true
  },
  {
    "id": "nvidia/nemotron-3.5-content-safety",
    "uri": "model:nvidia/text/core-guard-weights:3.5",
    "license": "OpenMDW-1.1",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/nvidia/Nemotron-3.5-Content-Safety",
    "current": true
  },
  {
    "id": "nvidia/llama-nemotron-rerank-vl-1b-v2",
    "uri": "model:nvidia/rerank/core-weights:2",
    "license": "NVIDIA Open Model License Agreement",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/nvidia/llama-nemotron-rerank-vl-1b-v2",
    "current": true
  },
  {
    "id": "openai/gpt-image-1",
    "uri": "model:openai/image/core:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-image-1.toml",
    "current": false
  },
  {
    "id": "openai/gpt-image-1.5",
    "uri": "model:openai/image/core:1.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-image-1.5.toml",
    "current": false
  },
  {
    "id": "openai/gpt-image-2",
    "uri": "model:openai/image/core:2",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-image-2.toml",
    "current": true
  },
  {
    "id": "openai/gpt-5-image",
    "uri": "model:openai/image/core:5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-5-image.toml",
    "current": false
  },
  {
    "id": "openai/gpt-5-image-mini",
    "uri": "model:openai/image/light:5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-5-image-mini.toml",
    "current": true
  },
  {
    "id": "openai/gpt-5-codex",
    "uri": "model:openai/text/core-code:5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-5-codex.toml",
    "current": false
  },
  {
    "id": "openai/gpt-5.1-codex",
    "uri": "model:openai/text/core-code:5.1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-5.1-codex.toml",
    "current": false
  },
  {
    "id": "openai/gpt-5.2-codex",
    "uri": "model:openai/text/core-code:5.2",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-5.2-codex.toml",
    "current": false
  },
  {
    "id": "openai/gpt-5.3-codex",
    "uri": "model:openai/text/core-code:5.3",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/4faf622d1efc54d6dc8e3eba5d3c082029d6b3b5/providers/openai/models/gpt-5.3-codex.toml",
    "current": false
  },
  {
    "id": "openai/gpt-oss-safeguard-120b",
    "uri": "model:openai/text/core-guard-open/120b:1",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/openai/gpt-oss-safeguard-120b",
    "current": true
  },
  {
    "id": "openai/gpt-oss-120b",
    "uri": "model:openai/text/core-open/120b:1",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/openai/gpt-oss-120b",
    "current": true
  },
  {
    "id": "openai/o3-deep-research",
    "uri": "model:openai/text/core-research:o3",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/o3-deep-research.toml",
    "current": false
  },
  {
    "id": "openai/gpt-3.5-turbo",
    "uri": "model:openai/text/core:3.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-3.5-turbo.toml",
    "current": false
  },
  {
    "id": "openai/gpt-4",
    "uri": "model:openai/text/core:4",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-4.toml",
    "current": false
  },
  {
    "id": "openai/gpt-4.1",
    "uri": "model:openai/text/core:4.1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-4.1.toml",
    "current": false
  },
  {
    "id": "openai/gpt-4o",
    "uri": "model:openai/text/core:4o",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-4o.toml",
    "current": false
  },
  {
    "id": "openai/gpt-5",
    "uri": "model:openai/text/core:5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-5.toml",
    "current": false
  },
  {
    "id": "openai/gpt-5.1",
    "uri": "model:openai/text/core:5.1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-5.1.toml",
    "current": false
  },
  {
    "id": "openai/gpt-5.2",
    "uri": "model:openai/text/core:5.2",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-5.2.toml",
    "current": false
  },
  {
    "id": "openai/gpt-5.4",
    "uri": "model:openai/text/core:5.4",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/e11ad7c01a9ed6989222bc30b0c062b595f60838/providers/openai/models/gpt-5.4.toml",
    "current": false
  },
  {
    "id": "openai/gpt-5.5",
    "uri": "model:openai/text/core:5.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/3e0fe362f296489da0781df7f62531e05bcf7dc9/providers/openai/models/gpt-5.5.toml",
    "current": false
  },
  {
    "id": "openai/gpt-5.6-terra",
    "uri": "model:openai/text/core:5.6",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/6dfc39c81b6cd57a91c155aa7b4f68ed1b360da0/providers/openai/models/gpt-5.6-terra.toml",
    "current": false
  },
  {
    "id": "openai/gpt-6-sol",
    "uri": "model:openai/text/core:6",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/67cb71f2b5ea59a6d076a70a509cdbe663e152c7/providers/openai/models/gpt-6-sol.toml",
    "current": false
  },
  {
    "id": "openai/gpt-6.1-sol",
    "uri": "model:openai/text/core:6.1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/ae762dbd8d0e185e831d37a696199ac28c979aa6/providers/openai/models/gpt-6.1-sol.toml",
    "current": false
  },
  {
    "id": "openai/gpt-6.2-sol",
    "uri": "model:openai/text/core:6.2",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/2dbda9a2febeb5f62e116729ea0288ca75230129/providers/openai/models/gpt-6.2-sol.toml",
    "current": true
  },
  {
    "id": "openai/o1",
    "uri": "model:openai/text/core:o1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/o1.toml",
    "current": false
  },
  {
    "id": "openai/o3",
    "uri": "model:openai/text/core:o3",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/o3.toml",
    "current": false
  },
  {
    "id": "openai/gpt-5.1-codex-mini",
    "uri": "model:openai/text/light-code:5.1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-5.1-codex-mini.toml",
    "current": false
  },
  {
    "id": "openai/gpt-oss-safeguard-20b",
    "uri": "model:openai/text/light-guard-open/20b:1",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/openai/gpt-oss-safeguard-20b",
    "current": true
  },
  {
    "id": "openai/gpt-oss-20b",
    "uri": "model:openai/text/light-open/20b:1",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/openai/gpt-oss-20b",
    "current": true
  },
  {
    "id": "openai/o4-mini-deep-research",
    "uri": "model:openai/text/light-research:o4",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/o4-mini-deep-research.toml",
    "current": false
  },
  {
    "id": "openai/gpt-4-turbo",
    "uri": "model:openai/text/light:4",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-4-turbo.toml",
    "current": false
  },
  {
    "id": "openai/gpt-4.1-mini",
    "uri": "model:openai/text/light:4.1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-4.1-mini.toml",
    "current": false
  },
  {
    "id": "openai/gpt-4o-mini",
    "uri": "model:openai/text/light:4o",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-4o-mini.toml",
    "current": false
  },
  {
    "id": "openai/gpt-5-mini",
    "uri": "model:openai/text/light:5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-5-mini.toml",
    "current": false
  },
  {
    "id": "openai/gpt-5.4-mini",
    "uri": "model:openai/text/light:5.4",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d839cd37d4fa79a0fb59180a15070e921eda6880/providers/openai/models/gpt-5.4-mini.toml",
    "current": false
  },
  {
    "id": "openai/gpt-5.6-luna",
    "uri": "model:openai/text/light:5.6",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/6dfc39c81b6cd57a91c155aa7b4f68ed1b360da0/providers/openai/models/gpt-5.6-luna.toml",
    "current": false
  },
  {
    "id": "openai/gpt-6.1-terra",
    "uri": "model:openai/text/light:6.1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/f290f5f68cd5592b3f77d7a359fc20ce4148e5e4/providers/openai/models/gpt-6.1-terra.toml",
    "current": true
  },
  {
    "id": "openai/o3-mini",
    "uri": "model:openai/text/light:o3",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/o3-mini.toml",
    "current": false
  },
  {
    "id": "openai/o4-mini",
    "uri": "model:openai/text/light:o4",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/o4-mini.toml",
    "current": false
  },
  {
    "id": "openai/gpt-5.1-codex-max",
    "uri": "model:openai/text/ultra-code:5.1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-5.1-codex-max.toml",
    "current": false
  },
  {
    "id": "openai/gpt-5.6-cyber",
    "uri": "model:openai/text/ultra-restricted:5.6",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-5.6-cyber.toml",
    "current": true
  },
  {
    "id": "openai/gpt-5-pro",
    "uri": "model:openai/text/ultra:5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-5-pro.toml",
    "current": false
  },
  {
    "id": "openai/gpt-5.2-pro",
    "uri": "model:openai/text/ultra:5.2",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-5.2-pro.toml",
    "current": false
  },
  {
    "id": "openai/gpt-5.4-pro",
    "uri": "model:openai/text/ultra:5.4",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/e11ad7c01a9ed6989222bc30b0c062b595f60838/providers/openai/models/gpt-5.4-pro.toml",
    "current": false
  },
  {
    "id": "openai/gpt-5.5-pro",
    "uri": "model:openai/text/ultra:5.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/f1cad8fdc08f08eacbdee195b0a87908cd088943/providers/openai/models/gpt-5.5-pro.toml",
    "current": false
  },
  {
    "id": "openai/gpt-5.6-sol",
    "uri": "model:openai/text/ultra:5.6",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/6dfc39c81b6cd57a91c155aa7b4f68ed1b360da0/providers/openai/models/gpt-5.6-sol.toml",
    "current": false
  },
  {
    "id": "openai/gpt-6-astra",
    "uri": "model:openai/text/ultra:6",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/fe5b09c6ea3ffd4f82e72b3d4bb6a8b670688b56/providers/openai/models/gpt-6-astra.toml",
    "current": false
  },
  {
    "id": "openai/gpt-6.2-astra",
    "uri": "model:openai/text/ultra:6.2",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/2dbda9a2febeb5f62e116729ea0288ca75230129/providers/openai/models/gpt-6.2-astra.toml",
    "current": true
  },
  {
    "id": "openai/o1-pro",
    "uri": "model:openai/text/ultra:o1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/o1-pro.toml",
    "current": false
  },
  {
    "id": "openai/o3-pro",
    "uri": "model:openai/text/ultra:o3",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/o3-pro.toml",
    "current": false
  },
  {
    "id": "openai/gpt-4.1-nano",
    "uri": "model:openai/text/nano:4.1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-4.1-nano.toml",
    "current": false
  },
  {
    "id": "openai/gpt-5-nano",
    "uri": "model:openai/text/nano:5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-5-nano.toml",
    "current": false
  },
  {
    "id": "openai/gpt-5.4-nano",
    "uri": "model:openai/text/nano:5.4",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d839cd37d4fa79a0fb59180a15070e921eda6880/providers/openai/models/gpt-5.4-nano.toml",
    "current": false
  },
  {
    "id": "openai/gpt-6-luna",
    "uri": "model:openai/text/nano:6",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/67cb71f2b5ea59a6d076a70a509cdbe663e152c7/providers/openai/models/gpt-6-luna.toml",
    "current": true
  },
  {
    "id": "openai/gpt-realtime-whisper",
    "uri": "model:openai/transcribe/core-rt:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-realtime-whisper.toml",
    "current": true
  },
  {
    "id": "openai/whisper-large-v3",
    "uri": "model:openai/transcribe/core-open/1.55b:3",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/openai/whisper-large-v3",
    "current": true
  },
  {
    "id": "openai/whisper-large-v3-turbo",
    "uri": "model:openai/transcribe/core-open/809m:3",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/openai/whisper-large-v3-turbo",
    "current": true
  },
  {
    "id": "openbmb/minicpm-v-4.7-35b-a3b",
    "uri": "model:openbmb/text/core-open/35b-a3b:4.7",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/openbmb/MiniCPM-V-4.7-35B-A3B",
    "current": true
  },
  {
    "id": "openbmb/minicpm5-2b",
    "uri": "model:openbmb/text/light-open/2b:5",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/openbmb/MiniCPM5-2B",
    "current": true
  },
  {
    "id": "openbmb/minicpm5-1b",
    "uri": "model:openbmb/text/nano-open/1b:5",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/openbmb/MiniCPM5-1B",
    "current": true
  },
  {
    "id": "opendatalab/mineru2.5-2509-1.2b",
    "uri": "model:opendatalab/text/core-ocr-open/1.2b:2.5",
    "license": "AGPL-3.0-only",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/opendatalab/MinerU2.5-2509-1.2B",
    "current": true
  },
  {
    "id": "paddlepaddle/paddleocr-vl",
    "uri": "model:paddlepaddle/text/core-ocr-open:1",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/PaddlePaddle/PaddleOCR-VL",
    "current": true
  },
  {
    "id": "perceptron/perceptron-mk1",
    "uri": "model:perceptron/text/core:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/perceptron/perceptron-mk1.toml",
    "current": false
  },
  {
    "id": "perceptron/perceptron-mk1.5",
    "uri": "model:perceptron/text/core:1.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/perceptron/perceptron-mk1.5.toml",
    "current": true
  },
  {
    "id": "perplexity/sonar-deep-research",
    "uri": "model:perplexity/text/core-research:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/perplexity/sonar-deep-research.toml",
    "current": false
  },
  {
    "id": "perplexity/sonar",
    "uri": "model:perplexity/text/core:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/perplexity/sonar.toml",
    "current": false
  },
  {
    "id": "perplexity/sonar-pro",
    "uri": "model:perplexity/text/high:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/perplexity/sonar-pro.toml",
    "current": false
  },
  {
    "id": "phocinae/phocinae-largha-150m-v1",
    "uri": "model:phocinae/decision/core-open/150m:1",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/Phocinae/Phocinae-Largha-150M-v1",
    "current": true
  },
  {
    "id": "poolside/laguna-m.1",
    "uri": "model:poolside/text/ultra-code-open:1",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/poolside/Laguna-M.1",
    "current": true
  },
  {
    "id": "poolside/laguna-s-2.1",
    "uri": "model:poolside/text/core-code-weights:2.1",
    "license": "OpenMDW-1.1",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/poolside/Laguna-S-2.1",
    "current": true
  },
  {
    "id": "poolside/laguna-xs.2",
    "uri": "model:poolside/text/light-code-open:2",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/poolside/Laguna-XS.2",
    "current": true
  },
  {
    "id": "poolside/laguna-xs-2.1",
    "uri": "model:poolside/text/light-code-weights:2.1",
    "license": "OpenMDW-1.1",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/poolside/Laguna-XS-2.1",
    "current": true
  },
  {
    "id": "quiverai/arrow-2",
    "uri": "model:quiverai/image/core:2",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/quiverai/arrow-2.toml",
    "current": true
  },
  {
    "id": "quiverai/arrow-2-telos",
    "uri": "model:quiverai/image/high:2",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/quiverai/arrow-2-telos.toml",
    "current": true
  },
  {
    "id": "recursive/flint",
    "uri": "model:recursive/text/core-open:1",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/RecursiveSI/flint",
    "current": true
  },
  {
    "id": "reflection/beam-1.0-501b-a23b",
    "uri": "model:reflection/text/core-open/501b-a23b:1.0",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/reflection/Beam-1.0-501B-A23B",
    "current": true
  },
  {
    "id": "rekaai/reka-flash-3",
    "uri": "model:rekaai/text/core-open:3",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/RekaAI/reka-flash-3",
    "current": true
  },
  {
    "id": "rekaai/reka-edge",
    "uri": "model:rekaai/text/light-weights:2603",
    "license": "BUSL-1.1",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/RekaAI/reka-edge-2603",
    "current": true
  },
  {
    "id": "relace/relace-apply-3",
    "uri": "model:relace/text/core:3",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/relace/relace-apply-3.toml",
    "current": true
  },
  {
    "id": "relace/relace-search",
    "uri": "model:relace/text/high:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/relace/relace-search.toml",
    "current": true
  },
  {
    "id": "respan/span-02",
    "uri": "model:respan/decision/core-open:02",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/respanai/span-02",
    "current": true
  },
  {
    "id": "respan/span-01",
    "uri": "model:respan/decision/core:01",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/respan/span-01.toml",
    "current": true
  },
  {
    "id": "sakana/fugu",
    "uri": "model:sakana/text/core:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://raw.githubusercontent.com/SakanaAI/fugu/refs/heads/main/configs/files/fugu.json",
    "current": true
  },
  {
    "id": "sakana/fugu-max",
    "uri": "model:sakana/text/high:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/sakana/fugu-max.toml",
    "current": true
  },
  {
    "id": "sakana/sakana-namazu",
    "uri": "model:sakana/text/light:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://sakana.ai/namazu/",
    "current": true
  },
  {
    "id": "sakana/fugu-ultra",
    "uri": "model:sakana/text/ultra:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://raw.githubusercontent.com/SakanaAI/fugu/refs/heads/main/configs/files/fugu.json",
    "current": false
  },
  {
    "id": "sakana/fugu-ultra-v2",
    "uri": "model:sakana/text/ultra:2",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/sakana/fugu-ultra-v2.toml",
    "current": true
  },
  {
    "id": "sarvam/sarvam-105b",
    "uri": "model:sarvam/text/ultra-open:1",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/sarvamai/sarvam-105b",
    "current": true
  },
  {
    "id": "stepfun/step-3.5-flash",
    "uri": "model:stepfun/text/light-open:3.5",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/stepfun-ai/Step-3.5-Flash",
    "current": false
  },
  {
    "id": "stepfun/step-3.7-flash",
    "uri": "model:stepfun/text/light-open:3.7",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/stepfun-ai/Step-3.7-Flash",
    "current": true
  },
  {
    "id": "swiss-ai/apertus-8b",
    "uri": "model:swiss-ai/text/core-open/8b:1",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/swiss-ai/Apertus-8B-Instruct-2509",
    "current": false
  },
  {
    "id": "swiss-ai/apertus-v1.5-8b",
    "uri": "model:swiss-ai/text/core-open/8b:1.5",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/swiss-ai/Apertus-v1.5-8B",
    "current": true
  },
  {
    "id": "swiss-ai/apertus-70b",
    "uri": "model:swiss-ai/text/ultra-open/70b:1",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/swiss-ai/Apertus-70B-Instruct-2509",
    "current": false
  },
  {
    "id": "swiss-ai/apertus-v1.5-70b",
    "uri": "model:swiss-ai/text/ultra-open/70b:1.5",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/swiss-ai/Apertus-v1.5-70B",
    "current": true
  },
  {
    "id": "tencent/hy3",
    "uri": "model:tencent/text/core-open:3",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/tencent/Hy3",
    "current": true
  },
  {
    "id": "tencent/hy4",
    "uri": "model:tencent/text/core:4",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/tencent/hy4.toml",
    "current": true
  },
  {
    "id": "tencent/hy4-flash",
    "uri": "model:tencent/text/light:4",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/tencent/hy4-flash.toml",
    "current": true
  },
  {
    "id": "tencent/hy4-preview",
    "uri": "model:tencent/text/core-open:4preview",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/tencent/Hy4-preview",
    "current": false
  },
  {
    "id": "tencent/hy-mt2-30b-a3b",
    "uri": "model:tencent/text/core-translate-open/30b-a3b:2",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/tencent/Hy-MT2-30B-A3B",
    "current": true
  },
  {
    "id": "tencent/hy-mt2-7b",
    "uri": "model:tencent/text/core-translate-open/7b:2",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/tencent/Hy-MT2-7B",
    "current": true
  },
  {
    "id": "tencent/hy-mt2-1.8b",
    "uri": "model:tencent/text/core-translate-open/1.8b:2",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/tencent/Hy-MT2-1.8B",
    "current": true
  },
  {
    "id": "thinkingmachines/inkling-small",
    "uri": "model:thinkingmachines/text/core-open/276b-a12b:1",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/thinkingmachines/Inkling-Small",
    "current": true
  },
  {
    "id": "thinkingmachines/inkling-2-small",
    "uri": "model:thinkingmachines/text/core-open/594b-a17b:2",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://thinkingmachines.ai/model-card/inkling-2-small/",
    "current": true
  },
  {
    "id": "thinkingmachines/inkling-2-mini",
    "uri": "model:thinkingmachines/text/light-open/26.4b-a3.4b:2",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://thinkingmachines.ai/model-card/inkling-2-mini/",
    "current": true
  },
  {
    "id": "thinkingmachines/inkling",
    "uri": "model:thinkingmachines/text/ultra-open/975b-a41b:1",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/thinkingmachines/Inkling",
    "current": true
  },
  {
    "id": "typesafe/jev-1.13.0",
    "uri": "model:typesafe/decision/core:1.13.0",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/typesafe/jev-1.13.0.toml",
    "current": false
  },
  {
    "id": "typesafe/jev-1.14.0",
    "uri": "model:typesafe/decision/core:1.14.0",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/typesafe/jev-1.14.0.toml",
    "current": true
  },
  {
    "id": "unbiased/pareto-26.10",
    "uri": "model:unbiased/text/core:26.10",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/unbiased/pareto-26.10.toml",
    "current": false,
    "former_native": { "nanogpt": "unbiased/pareto-26.10" }
  },
  {
    "id": "upstage/solar-10.7b-instruct-v1.0",
    "uri": "model:upstage/text/core-weights/10.7b:1.0",
    "license": "CC-BY-NC-4.0",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/upstage/SOLAR-10.7B-Instruct-v1.0",
    "current": true
  },
  {
    "id": "upstage/solar-mini4",
    "uri": "model:upstage/text/light:4",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/upstage/solar-mini4.toml",
    "current": true
  },
  {
    "id": "upstage/solar-pro2",
    "uri": "model:upstage/text/ultra:2",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/upstage/solar-pro2.toml",
    "current": false
  },
  {
    "id": "upstage/solar-pro3",
    "uri": "model:upstage/text/ultra:3",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/upstage/solar-pro3.toml",
    "current": false
  },
  {
    "id": "upstage/solar-pro4",
    "uri": "model:upstage/text/ultra:4",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/upstage/solar-pro4.toml",
    "current": true
  },
  {
    "id": "vispark/vision-medium",
    "uri": "model:vispark/text/core:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/vispark/vision-medium.toml",
    "current": true
  },
  {
    "id": "vispark/vision-small",
    "uri": "model:vispark/text/light:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/vispark/vision-small.toml",
    "current": true
  },
  {
    "id": "vispark/vision-large",
    "uri": "model:vispark/text/ultra:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/vispark/vision-large.toml",
    "current": true
  },
  {
    "id": "vivgrid/viv-fast",
    "uri": "model:vivgrid/text/light-code:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/vivgrid/viv-fast.toml",
    "current": true
  },
  {
    "id": "writer/palmyra-x4",
    "uri": "model:writer/text/core:x4",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/writer/palmyra-x4.toml",
    "current": false
  },
  {
    "id": "writer/palmyra-x5",
    "uri": "model:writer/text/core:x5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/writer/palmyra-x5.toml",
    "current": true
  },
  {
    "id": "writer/palmyra-vision-7b",
    "uri": "model:writer/text/light:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/2548b4583cce12f2bb3ec91f008472680310ff2e/models/writer/palmyra-vision-7b.toml",
    "current": true
  },
  {
    "id": "xai/grok-imagine-image",
    "uri": "model:xai/image/core:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/xai/grok-imagine-image.toml",
    "current": false
  },
  {
    "id": "xai/grok-imagine-image-2.0",
    "uri": "model:xai/image/core:2.0",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/xai/grok-imagine-image-2.0.toml",
    "current": true
  },
  {
    "id": "xai/grok-imagine-image-quality",
    "uri": "model:xai/image/high:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/xai/grok-imagine-image-quality.toml",
    "current": true
  },
  {
    "id": "xai/grok-build-0.1",
    "uri": "model:xai/text/core-code:0.1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/xai/grok-build-0.1.toml",
    "current": true
  },
  {
    "id": "xai/grok-4.20-0309-reasoning",
    "uri": "model:xai/text/core:4.20",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/ad34d7948c9b214995006e1cf33fccff20c60c3a/providers/xai/models/grok-4.20-0309-reasoning.toml",
    "current": false
  },
  {
    "id": "xai/grok-4.3",
    "uri": "model:xai/text/core:4.3",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/ca380a136e365d8abb776010e07ef992fcf65072/providers/xai/models/grok-4.3.toml",
    "current": true
  },
  {
    "id": "xai/grok-code-fast-1",
    "uri": "model:xai/text/light-code:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/xai/grok-code-fast-1.toml",
    "current": false
  },
  {
    "id": "xai/grok-4-fast-reasoning",
    "uri": "model:xai/text/light:4",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/xai/grok-4-fast-reasoning.toml",
    "current": false
  },
  {
    "id": "xai/grok-4.1-fast-reasoning",
    "uri": "model:xai/text/light:4.1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/xai/grok-4.1-fast-reasoning.toml",
    "current": false
  },
  {
    "id": "xai/grok-4.5",
    "uri": "model:xai/text/ultra:4.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/4e4161773e2e0e7ff02b4b4a89e6e7b3be81de98/providers/xai/models/grok-4.5.toml",
    "current": false
  },
  {
    "id": "xai/grok-4.6",
    "uri": "model:xai/text/ultra:4.6",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/2f038556752cc5c05febea83789e266903738491/providers/xai/models/grok-4.6.toml",
    "current": false
  },
  {
    "id": "xai/grok-4.7",
    "uri": "model:xai/text/ultra:4.7",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/ce2cb0547484fb62bee8813352123d5a6a5f550b/providers/xai/models/grok-4.7.toml",
    "current": true
  },
  {
    "id": "xai/grok-voice-transcribe-2.0",
    "uri": "model:xai/transcribe/core-rt:2.0",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/xai/grok-voice-transcribe-2.0.toml",
    "current": true
  },
  {
    "id": "xai/grok-tts",
    "uri": "model:xai/tts/core:1",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/xai/grok-tts.toml",
    "current": true
  },
  {
    "id": "xai/grok-imagine-video-1.5",
    "uri": "model:xai/video/core:1.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/xai/grok-imagine-video-1.5.toml",
    "current": true
  },
  {
    "id": "xai/grok-imagine-video-1.5-lite",
    "uri": "model:xai/video/light:1.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/xai/grok-imagine-video-1.5-lite.toml",
    "current": true
  },
  {
    "id": "xiaomi/mimo-v2-flash",
    "uri": "model:xiaomi/text/core-open:2",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/XiaomiMiMo/MiMo-V2-Flash",
    "current": false
  },
  {
    "id": "xiaomi/mimo-v2.5",
    "uri": "model:xiaomi/text/core-open:2.5",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/XiaomiMiMo/MiMo-V2.5",
    "current": false
  },
  {
    "id": "xiaomi/mimo-v2.6-flash",
    "uri": "model:xiaomi/text/core-open:2.6",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Flash-RL",
    "current": true
  },
  {
    "id": "xiaomi/mimo-v2-omni",
    "uri": "model:xiaomi/text/core:2",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/xiaomi/mimo-v2-omni.toml",
    "current": false
  },
  {
    "id": "xiaomi/mimo-v2.5-pro",
    "uri": "model:xiaomi/text/high-open:2.5",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/XiaomiMiMo/MiMo-V2.5-Pro",
    "current": false
  },
  {
    "id": "xiaomi/mimo-v2.6-pro",
    "uri": "model:xiaomi/text/high-open:2.6",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL",
    "current": true
  },
  {
    "id": "xiaomi/mimo-v2-pro",
    "uri": "model:xiaomi/text/high:2",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/xiaomi/mimo-v2-pro.toml",
    "current": true
  },
  {
    "id": "xiaomi/mimo-v2.5-tts-voiceclone",
    "uri": "model:xiaomi/tts/core-voiceclone:2.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/xiaomi/mimo-v2.5-tts-voiceclone.toml",
    "current": true
  },
  {
    "id": "xiaomi/mimo-v2.5-tts-voicedesign",
    "uri": "model:xiaomi/tts/core-voicedesign:2.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/xiaomi/mimo-v2.5-tts-voicedesign.toml",
    "current": true
  },
  {
    "id": "xiaomi/mimo-v2.5-tts",
    "uri": "model:xiaomi/tts/core:2.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/xiaomi/mimo-v2.5-tts.toml",
    "current": true
  },
  {
    "id": "zhipuai/glm-image",
    "uri": "model:zhipuai/image/core-open:1",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/zai-org/GLM-Image",
    "current": true
  },
  {
    "id": "zhipuai/autoglm-phone-9b-multilingual",
    "uri": "model:zhipuai/text/core-gui-open/9b:1",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/zai-org/AutoGLM-Phone-9B-Multilingual",
    "current": true
  },
  {
    "id": "zhipuai/glm-4.5",
    "uri": "model:zhipuai/text/core-open:4.5",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/zai-org/GLM-4.5",
    "current": false
  },
  {
    "id": "zhipuai/glm-4.6",
    "uri": "model:zhipuai/text/core-open:4.6",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/zai-org/GLM-4.6",
    "current": false
  },
  {
    "id": "zhipuai/glm-4.7",
    "uri": "model:zhipuai/text/core-open:4.7",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/zai-org/GLM-4.7",
    "current": true
  },
  {
    "id": "zhipuai/glm-5-turbo",
    "uri": "model:zhipuai/text/core:5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/zhipuai/glm-5-turbo.toml",
    "current": true
  },
  {
    "id": "zhipuai/glm-4.5-air",
    "uri": "model:zhipuai/text/light-open:4.5",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/zai-org/GLM-4.5-Air",
    "current": false
  },
  {
    "id": "zhipuai/glm-4.7-flashx",
    "uri": "model:zhipuai/text/light-open:4.7",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/zai-org/GLM-4.7-Flash",
    "current": false
  },
  {
    "id": "zhipuai/glm-5.3-flash",
    "uri": "model:zhipuai/text/light-open:5.3",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/zai-org/GLM-5.3-Flash",
    "current": true
  },
  {
    "id": "zhipuai/glm-4.5-flash",
    "uri": "model:zhipuai/text/light:4.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/zhipuai/glm-4.5-flash.toml",
    "current": true
  },
  {
    "id": "zhipuai/glm-5",
    "uri": "model:zhipuai/text/ultra-open:5",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/zai-org/GLM-5",
    "current": false
  },
  {
    "id": "zhipuai/glm-5.1",
    "uri": "model:zhipuai/text/ultra-open:5.1",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/zai-org/GLM-5.1",
    "current": false
  },
  {
    "id": "zhipuai/glm-5.2",
    "uri": "model:zhipuai/text/ultra-open:5.2",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/zai-org/GLM-5.2",
    "current": true
  },
  {
    "id": "zhipuai/glm-5.3",
    "uri": "model:zhipuai/text/ultra-weights:5.3",
    "license": "GLM-5.3 License",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/zai-org/GLM-5.3",
    "current": true
  },
  {
    "id": "zhipuai/glm-5.4",
    "uri": "model:zhipuai/text/ultra:5.4",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/2548b4583cce12f2bb3ec91f008472680310ff2e/models/zhipuai/glm-5.4.toml",
    "current": true
  },
  {
    "id": "zhipuai/glm-4.6v-flash",
    "uri": "model:zhipuai/text/nano-open:4.6",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/zai-org/GLM-4.6V-Flash",
    "current": false
  },
  {
    "id": "zhipuai/glm-4.7-flash",
    "uri": "model:zhipuai/text/nano-open:4.7",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://huggingface.co/zai-org/GLM-4.7-Flash",
    "current": true
  },
  {
    "id": "zhipuai/glm-5.3-flashx-legal",
    "uri": "model:zhipuai/text/light-legal:5.3",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/5267124fbd7665693c3375422215717210078d34/models/zhipuai/glm-5.3-flashx-legal.toml",
    "current": true
  },
  {
    "id": "zhipuai/glm-4-32b-0414-128k",
    "uri": "model:zhipuai/text/core-open/32b:4.0414",
    "license": "MIT",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/5267124fbd7665693c3375422215717210078d34/models/zhipuai/glm-4-32b-0414-128k.toml",
    "current": true
  },
  {
    "id": "stepfun/stepaudio-2.5-chat",
    "uri": "model:stepfun/text/core:2.5",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/5267124fbd7665693c3375422215717210078d34/models/stepfun/stepaudio-2.5-chat.toml",
    "current": true
  },
  {
    "id": "stepfun/step-1o-turbo-vision",
    "uri": "model:stepfun/text/light:1o",
    "license": "proprietary",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/5267124fbd7665693c3375422215717210078d34/models/stepfun/step-1o-turbo-vision.toml",
    "current": true
  },
  {
    "id": "ricursiveai/ripple-65b-preview",
    "uri": "model:ricursiveai/text/core-code-open/65b:1preview",
    "license": "Apache-2.0",
    "tier_source": "registry",
    "evidence": "https://github.com/anomalyco/models.dev/blob/5267124fbd7665693c3375422215717210078d34/models/ricursiveai/ripple-65b-preview.toml",
    "current": true
  }
];

export const INCOMPATIBLE = [
  {
    "id": "alibaba/qwen-flash",
    "publisher": "alibaba",
    "name": "Qwen Flash",
    "reason": "rolling-alias",
    "detail": "Unversioned rolling alias on Alibaba Cloud whose underlying checkpoint updates silently over time.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/alibaba/qwen-flash.toml"
  },
  {
    "id": "alibaba/qwen-max",
    "publisher": "alibaba",
    "name": "Qwen Max",
    "reason": "rolling-alias",
    "detail": "Unversioned rolling alias on Alibaba Cloud whose underlying checkpoint updates silently over time.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/alibaba/qwen-max.toml"
  },
  {
    "id": "alibaba/qwen-plus",
    "publisher": "alibaba",
    "name": "Qwen Plus",
    "reason": "rolling-alias",
    "detail": "Unversioned rolling alias on Alibaba Cloud whose underlying checkpoint updates silently over time.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/alibaba/qwen-plus.toml"
  },
  {
    "id": "alibaba/qwen-turbo",
    "publisher": "alibaba",
    "name": "Qwen Turbo",
    "reason": "rolling-alias",
    "detail": "Unversioned rolling alias on Alibaba Cloud whose underlying checkpoint updates silently over time.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/alibaba/qwen-turbo.toml"
  },
  {
    "id": "alibaba/qwen-vl-max",
    "publisher": "alibaba",
    "name": "Qwen-VL Max",
    "reason": "rolling-alias",
    "detail": "Unversioned rolling alias for Qwen-VL Max whose underlying checkpoint updates silently over time.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/alibaba/qwen-vl-max.toml"
  },
  {
    "id": "alibaba/qwen-vl-plus",
    "publisher": "alibaba",
    "name": "Qwen-VL Plus",
    "reason": "rolling-alias",
    "detail": "Unversioned rolling alias for Qwen-VL Plus whose underlying checkpoint updates silently over time.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/alibaba/qwen-vl-plus.toml"
  },
  {
    "id": "alibaba/qwen3-235b-a22b-thinking-2507",
    "publisher": "alibaba",
    "name": "Qwen3 235B-A22B Thinking 2507",
    "reason": "parameter-split",
    "conflicts_with": "model:alibaba/text/ultra-open/235b-a22b:3.2507",
    "detail": "Thinking/reasoning mode split of Qwen3 235B-A22B 2507 alongside the instruct release.",
    "evidence": "https://huggingface.co/Qwen/Qwen3-235B-A22B-Thinking-2507"
  },
  {
    "id": "alibaba/qwen3-next-80b-a3b-thinking",
    "publisher": "alibaba",
    "name": "Qwen3-Next 80B-A3B (Thinking)",
    "reason": "parameter-split",
    "conflicts_with": "model:alibaba/text/high-open/80b-a3b:3.next",
    "detail": "Thinking/reasoning mode split of Qwen3-Next 80B-A3B alongside the instruct release.",
    "evidence": "https://huggingface.co/Qwen/Qwen3-Next-80B-A3B-Thinking"
  },
  {
    "id": "alibaba/qwen3-omni-30b-a3b-thinking",
    "publisher": "alibaba",
    "name": "Qwen3 Omni 30B A3B Thinking",
    "reason": "parameter-split",
    "conflicts_with": "model:alibaba/text/light-open/30b-a3b:3.2507",
    "detail": "Thinking/reasoning mode variant with text-only output colliding on the alibaba/text/light-open/30b-a3b slot.",
    "evidence": "https://huggingface.co/Qwen/Qwen3-Omni-30B-A3B-Thinking"
  },
  {
    "id": "alibaba/qwen3-vl-235b-a22b-instruct",
    "publisher": "alibaba",
    "name": "Qwen3 VL 235B A22B Instruct",
    "reason": "slot-collision",
    "conflicts_with": "model:alibaba/text/ultra-open/235b-a22b:3.2507",
    "detail": "Parallel qwen3-vl vision-language family colliding on the alibaba/text/ultra-open/235b-a22b slot with Qwen3 235B-A22B.",
    "evidence": "https://huggingface.co/Qwen/Qwen3-VL-235B-A22B-Instruct"
  },
  {
    "id": "alibaba/qwen3-vl-235b-a22b-thinking",
    "publisher": "alibaba",
    "name": "Qwen3 VL 235B A22B Thinking",
    "reason": "parameter-split",
    "conflicts_with": "model:alibaba/text/ultra-open/235b-a22b:3.2507",
    "detail": "Thinking/reasoning mode split of Qwen3-VL 235B-A22B alongside the instruct release.",
    "evidence": "https://huggingface.co/Qwen/Qwen3-VL-235B-A22B-Thinking"
  },
  {
    "id": "alibaba/qwen3-vl-30b-a3b-instruct",
    "publisher": "alibaba",
    "name": "Qwen3 VL 30B A3B Instruct",
    "reason": "slot-collision",
    "conflicts_with": "model:alibaba/text/light-open/30b-a3b:3.2507",
    "detail": "Parallel qwen3-vl vision-language family colliding on the alibaba/text/light-open/30b-a3b slot with Qwen3 30B-A3B.",
    "evidence": "https://huggingface.co/Qwen/Qwen3-VL-30B-A3B-Instruct"
  },
  {
    "id": "alibaba/qwen3-vl-flash",
    "publisher": "alibaba",
    "name": "Qwen3 VL Flash (Alibaba Cloud)",
    "reason": "missing-evidence",
    "detail": "Closed vision-language variant with no pricing or first-party/major-host listing in models.dev to establish a verifiable tier.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/alibaba/qwen3-vl-flash.toml"
  },
  {
    "id": "alibaba/qwen3.8-max-prime",
    "publisher": "alibaba",
    "name": "Qwen 3.8 Max Prime",
    "reason": "parameter-split",
    "conflicts_with": "model:alibaba/text/ultra:3.8",
    "detail": "High-throughput serving edition of Qwen3.8 Max; deployment/throughput variant rather than a distinct model tier.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/alibaba/qwen3.8-max-prime.toml"
  },
  {
    "id": "alibaba/qwen3.8-omni-flash",
    "publisher": "alibaba",
    "name": "Qwen3.8 Omni Flash",
    "reason": "slot-collision",
    "conflicts_with": "model:alibaba/text/light:3.8",
    "detail": "Text-output omni-input variant whose primary output is text, colliding on the alibaba/text/light:3.8 slot with Qwen3.8 Flash.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/alibaba/qwen3.8-omni-flash.toml"
  },
  {
    "id": "alibaba/qwq-32b",
    "publisher": "alibaba",
    "name": "QwQ 32B",
    "reason": "slot-collision",
    "conflicts_with": "model:alibaba/text/core-open/32b:3",
    "detail": "Parallel QwQ reasoning family colliding on the alibaba/text/core-open/32b slot with Qwen3 32B.",
    "evidence": "https://huggingface.co/Qwen/QwQ-32B"
  },
  {
    "id": "alibaba/qwq-plus",
    "publisher": "alibaba",
    "name": "QwQ Plus",
    "reason": "slot-collision",
    "conflicts_with": "model:alibaba/text/core",
    "detail": "Parallel QwQ reasoning family colliding on the closed alibaba/text/core slot.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/alibaba/qwq-plus.toml"
  },
  {
    "id": "black-forest-labs/flux-1-kontext-dev",
    "publisher": "black-forest-labs",
    "name": "FLUX.1 Kontext [dev]",
    "reason": "slot-collision",
    "conflicts_with": "model:black-forest-labs/image/core-weights:1",
    "detail": "Parallel instruction-editing family (flux-kontext-dev) under FLUX.1 [dev] Non-Commercial License collides on the black-forest-labs/image/core-weights:1 slot held by primary flux-1-dev.",
    "evidence": "https://huggingface.co/black-forest-labs/FLUX.1-Kontext-dev"
  },
  {
    "id": "bytedance-seed/seed-1-6-vision",
    "publisher": "bytedance-seed",
    "name": "Seed 1.6 Vision",
    "reason": "slot-collision",
    "conflicts_with": "model:bytedance-seed/text/core:1.6",
    "detail": "Separate vision checkpoint of the Seed 1.6 release at identical pricing ($0.11875/$1.18747), colliding with primary `bytedance-seed/seed-1-6` on `model:bytedance-seed/text/core:1.6`.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/bytedance-seed/seed-1-6-vision.toml"
  },
  {
    "id": "bytedance-seed/seed-evolving",
    "publisher": "bytedance-seed",
    "name": "Seed Evolving",
    "reason": "rolling-alias",
    "detail": "Explicitly described as a rolling unpinned model (`doubao-seed-evolving`) whose underlying release updates silently.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/bytedance-seed/seed-evolving.toml"
  },
  {
    "id": "canopylabs/orpheus-arabic-saudi",
    "publisher": "canopylabs",
    "name": "Orpheus Arabic Saudi",
    "reason": "slot-collision",
    "conflicts_with": "model:canopylabs/tts/core:1",
    "detail": "Saudi Arabic language-specific TTS edition colliding on model:canopylabs/tts/core with primary English Orpheus V1 because the URI grammar has no language component.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/canopylabs/orpheus-arabic-saudi.toml"
  },
  {
    "id": "cohere/c4ai-aya-vision-32b",
    "publisher": "cohere",
    "name": "Aya Vision 32B",
    "reason": "slot-collision",
    "conflicts_with": "model:cohere/text/high-weights/32b:1",
    "detail": "Parallel vision-language 32B Aya family colliding on the same model:cohere/text/high-weights/32b slot as c4ai-aya-expanse-32b.",
    "evidence": "https://huggingface.co/CohereLabs/aya-vision-32b"
  },
  {
    "id": "cohere/c4ai-aya-vision-8b",
    "publisher": "cohere",
    "name": "Aya Vision 8B",
    "reason": "slot-collision",
    "conflicts_with": "model:cohere/text/light-weights/8b:1",
    "detail": "Parallel vision-language 8B Aya family colliding on the same model:cohere/text/light-weights/8b slot as c4ai-aya-expanse-8b.",
    "evidence": "https://huggingface.co/CohereLabs/aya-vision-8b"
  },
  {
    "id": "cohere/command-a-reasoning-08-2025",
    "publisher": "cohere",
    "name": "Command A Reasoning",
    "reason": "missing-evidence",
    "detail": "Marked open_weights=true, but the Hugging Face repository returned HTTP 401 and raw_license is null, leaving normalized_license unverifiable.",
    "evidence": "https://huggingface.co/CohereLabs/c4ai-command-a-reasoning-08-2025"
  },
  {
    "id": "cohere/command-a-translate-08-2025",
    "publisher": "cohere",
    "name": "Command A Translate",
    "reason": "missing-evidence",
    "detail": "Marked open_weights=true, but the Hugging Face repository returned HTTP 401 and raw_license is null, leaving normalized_license unverifiable.",
    "evidence": "https://huggingface.co/CohereLabs/c4ai-command-a-translate-08-2025"
  },
  {
    "id": "cohere/command-a-vision-07-2025",
    "publisher": "cohere",
    "name": "Command A Vision",
    "reason": "missing-evidence",
    "detail": "Marked open_weights=true, but the Hugging Face repository returned HTTP 401 and raw_license is null, leaving normalized_license unverifiable.",
    "evidence": "https://huggingface.co/CohereLabs/c4ai-command-a-vision-07-2025"
  },
  {
    "id": "cohere/command-r7b-arabic-02-2025",
    "publisher": "cohere",
    "name": "Command R7B Arabic",
    "reason": "slot-collision",
    "conflicts_with": "model:cohere/text/nano-weights/7b:2412",
    "detail": "Regional Arabic-specialized Command R7B edition colliding on the same model:cohere/text/nano-weights/7b slot as command-r7b-12-2024.",
    "evidence": "https://huggingface.co/CohereLabs/c4ai-command-r7b-arabic-02-2025"
  },
  {
    "id": "cohere/tiny-aya-earth",
    "publisher": "cohere",
    "name": "Tiny Aya Earth",
    "reason": "slot-collision",
    "conflicts_with": "model:cohere/text/light-weights:1",
    "detail": "Regional variant (West Asian and African languages) colliding on the same model:cohere/text/light-weights slot as tiny-aya-global.",
    "evidence": "https://huggingface.co/CohereLabs/tiny-aya-earth"
  },
  {
    "id": "cohere/tiny-aya-fire",
    "publisher": "cohere",
    "name": "Tiny Aya Fire",
    "reason": "slot-collision",
    "conflicts_with": "model:cohere/text/light-weights:1",
    "detail": "Regional variant (South Asian languages) colliding on the same model:cohere/text/light-weights slot as tiny-aya-global.",
    "evidence": "https://huggingface.co/CohereLabs/tiny-aya-fire"
  },
  {
    "id": "cohere/tiny-aya-water",
    "publisher": "cohere",
    "name": "Tiny Aya Water",
    "reason": "slot-collision",
    "conflicts_with": "model:cohere/text/light-weights:1",
    "detail": "Regional variant (European and Asia-Pacific languages) colliding on the same model:cohere/text/light-weights slot as tiny-aya-global.",
    "evidence": "https://huggingface.co/CohereLabs/tiny-aya-water"
  },
  {
    "id": "deepreinforce/ornith-1.0-31b",
    "publisher": "deepreinforce",
    "name": "Ornith 1.0 31B",
    "reason": "missing-evidence",
    "detail": "Open-weights model has no downloadable weights URL and zero provider listings in models.dev, so no native identifier can be verified.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/deepreinforce/ornith-1.0-31b.toml"
  },
  {
    "id": "deepseek/deepseek-chat",
    "publisher": "deepseek",
    "name": "DeepSeek Chat",
    "reason": "rolling-alias",
    "detail": "Unpinned rolling API alias whose underlying DeepSeek checkpoint changes silently without a version bump.",
    "evidence": "https://huggingface.co/deepseek-ai/DeepSeek-V3.2"
  },
  {
    "id": "deepseek/deepseek-reasoner",
    "publisher": "deepseek",
    "name": "DeepSeek Reasoner",
    "reason": "rolling-alias",
    "detail": "Unpinned rolling API alias whose underlying DeepSeek reasoning checkpoint changes silently without a version bump.",
    "evidence": "https://huggingface.co/deepseek-ai/DeepSeek-V3.2"
  },
  {
    "id": "deepseek/deepseek-v4-flash-vision-exp",
    "publisher": "deepseek",
    "name": "DeepSeek V4 Flash Vision Exp",
    "reason": "slot-collision",
    "conflicts_with": "model:deepseek/text/light-open:4",
    "detail": "Experimental vision-input split of DeepSeek V4 Flash with text output; vision input has no separate scope and collides on model:deepseek/text/light-open:4.",
    "evidence": "https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp"
  },
  {
    "id": "google/diffusiongemma-26b-a4b-it",
    "publisher": "google",
    "name": "DiffusionGemma 26B A4B IT",
    "reason": "slot-collision",
    "conflicts_with": "model:google/text/core-open/26b-a4b:4",
    "detail": "Parallel discrete-diffusion family (`diffusiongemma`) collides on the same `google/text/*-open/26b-a4b` slot as Gemma 4 26B A4B.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/diffusiongemma-26b-a4b-it.toml"
  },
  {
    "id": "google/gemini-3.1-pro-preview-customtools",
    "publisher": "google",
    "name": "Gemini 3.1 Pro Preview Custom Tools",
    "reason": "parameter-split",
    "conflicts_with": "model:google/text/ultra:3.1",
    "detail": "Tool-use parameter/behaviour variant of Gemini 3.1 Pro Preview rather than a separate tier or release.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemini-3.1-pro-preview-customtools.toml"
  },
  {
    "id": "google/gemini-flash-latest",
    "publisher": "google",
    "name": "Gemini Flash Latest",
    "reason": "rolling-alias",
    "detail": "Unpinned rolling pointer (`-latest`) whose underlying model changes silently without a version bump.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemini-flash-latest.toml"
  },
  {
    "id": "google/gemini-flash-lite-latest",
    "publisher": "google",
    "name": "Gemini Flash-Lite Latest",
    "reason": "rolling-alias",
    "detail": "Unpinned rolling pointer (`-latest`) whose underlying model changes silently without a version bump.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemini-flash-lite-latest.toml"
  },
  {
    "id": "google/gemini-nano-banana-2.1",
    "publisher": "google",
    "name": "Nano Banana 2.1",
    "reason": "slot-collision",
    "conflicts_with": "model:google/image/core:3.1",
    "detail": "Parallel `nano-banana` 2.1 branding collides with the primary `gemini-*-image` `core` image slot (`gemini-3.1-flash-image`).",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemini-nano-banana-2.1.toml"
  },
  {
    "id": "google/gemini-omni-1.1-flash",
    "publisher": "google",
    "name": "Gemini Omni 1.1 Flash",
    "reason": "slot-collision",
    "conflicts_with": "model:google/video/light",
    "detail": "Parallel `gemini-omni` video family collides on Google's `video` lineup held by primary `veo`.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemini-omni-1.1-flash.toml"
  },
  {
    "id": "google/gemini-omni-flash-preview",
    "publisher": "google",
    "name": "Gemini Omni Flash Preview",
    "reason": "slot-collision",
    "conflicts_with": "model:google/video/light",
    "detail": "Parallel `gemini-omni` video family collides on Google's `video` lineup held by primary `veo`.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemini-omni-flash-preview.toml"
  },
  {
    "id": "google/gemma-3n-e2b-it",
    "publisher": "google",
    "name": "Gemma 3n E2B IT",
    "reason": "opaque-size",
    "detail": "Published with proprietary effective-parameter label (`E2B`) without verifiable total/active physical parameter counts.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemma-3n-e2b-it.toml"
  },
  {
    "id": "google/gemma-3n-e4b-it",
    "publisher": "google",
    "name": "Gemma 3n E4B IT",
    "reason": "opaque-size",
    "detail": "Published with proprietary effective-parameter label (`E4B`) without verifiable total/active physical parameter counts.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/gemma-3n-e4b-it.toml"
  },
  {
    "id": "google/gemma-4-E2B-it",
    "publisher": "google",
    "name": "Gemma 4 E2B IT",
    "reason": "opaque-size",
    "detail": "Published with proprietary effective-parameter label (`E2B`) without verifiable total/active physical parameter counts.",
    "evidence": "https://huggingface.co/google/gemma-4-E2B-it"
  },
  {
    "id": "google/gemma-4-E4B-it",
    "publisher": "google",
    "name": "Gemma 4 E4B IT",
    "reason": "opaque-size",
    "detail": "Published with proprietary effective-parameter label (`E4B`) without verifiable total/active physical parameter counts.",
    "evidence": "https://huggingface.co/google/gemma-4-E4B-it"
  },
  {
    "id": "google/veo-3.1-fast-generate-preview",
    "publisher": "google",
    "name": "Veo 3.1 Fast Preview",
    "reason": "parameter-split",
    "conflicts_with": "model:google/video/core:3.1",
    "detail": "Fast serving-latency variant of Veo 3.1 rather than a separate tier or release.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/google/veo-3.1-fast-generate-preview.toml"
  },
  {
    "id": "huawei/openpangu-2.0-flash",
    "publisher": "huawei",
    "name": "openPangu 2.0 Flash",
    "reason": "missing-evidence",
    "detail": "Marked open_weights=true, but normalized_license is null (Hugging Face returned no machine-readable SPDX licence identifier).",
    "evidence": "https://huggingface.co/openpangu/openPangu-2.0-Flash"
  },
  {
    "id": "huawei/openpangu-2.0-pro",
    "publisher": "huawei",
    "name": "openPangu 2.0 Pro",
    "reason": "missing-evidence",
    "detail": "Marked open_weights=true, but normalized_license is null (Hugging Face returned no machine-readable SPDX licence identifier).",
    "evidence": "https://huggingface.co/openpangu/openPangu-2.0-Pro"
  },
  {
    "id": "inclusionai/ling-3.0-flash-vl",
    "publisher": "inclusionai",
    "name": "Ling 3.0 Flash VL",
    "reason": "slot-collision",
    "conflicts_with": "model:inclusionai/text/core-open:3.0",
    "detail": "Separate multimodal vision-language checkpoint of Ling 3.0 Flash under MIT at identical pricing ($0.075/$0.224), colliding with `inclusionai/ling-3.0-flash` on `model:inclusionai/text/core-open:3.0`.",
    "evidence": "https://huggingface.co/inclusionAI/Ling-3.0-flash-VL"
  },
  {
    "id": "minimax/MiniMax-M2.5-highspeed",
    "publisher": "minimax",
    "name": "MiniMax-M2.5-highspeed",
    "reason": "parameter-split",
    "conflicts_with": "model:minimax/text/core-weights:2.5",
    "detail": "High-speed serving latency tier of MiniMax-M2.5 exposed as a separate model ID rather than a deployment/request parameter.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/minimax/MiniMax-M2.5-highspeed.toml"
  },
  {
    "id": "minimax/MiniMax-M2.7",
    "publisher": "minimax",
    "name": "MiniMax-M2.7",
    "reason": "missing-evidence",
    "detail": "Marked `open_weights: true`, but Hugging Face reported `license: \"other\"` with placeholder `license_name: \"other\"`, leaving `normalized_license: null`.",
    "evidence": "https://huggingface.co/MiniMaxAI/MiniMax-M2.7"
  },
  {
    "id": "minimax/MiniMax-M2.7-highspeed",
    "publisher": "minimax",
    "name": "MiniMax-M2.7-highspeed",
    "reason": "missing-evidence",
    "detail": "Marked `open_weights: true` without a verifiable licence (`normalized_license: null`), and also splits a high-speed serving latency mode as a separate model ID.",
    "evidence": "https://huggingface.co/MiniMaxAI/MiniMax-M2.7"
  },
  {
    "id": "mistral/codestral-latest",
    "publisher": "mistral",
    "name": "Codestral (latest)",
    "reason": "rolling-alias",
    "detail": "Rolling `-latest` alias whose underlying release changes silently.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/mistral/codestral-latest.toml"
  },
  {
    "id": "mistral/devstral-2512",
    "publisher": "mistral",
    "name": "Devstral 2",
    "reason": "missing-evidence",
    "detail": "Marked open_weights=true, but Hugging Face returned license=\"other\" with no license_name, leaving normalized_license null.",
    "evidence": "https://huggingface.co/mistralai/Devstral-2-123B-Instruct-2512"
  },
  {
    "id": "mistral/devstral-medium-2507",
    "publisher": "mistral",
    "name": "Devstral Medium",
    "reason": "slot-collision",
    "conflicts_with": "model:mistral/text/core-code:25.08",
    "detail": "Closed coding model family (devstral-medium) colliding with primary codestral on model:mistral/text/core-code (and has no active native host).",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/mistral/devstral-medium-2507.toml"
  },
  {
    "id": "mistral/devstral-medium-latest",
    "publisher": "mistral",
    "name": "Devstral 2 (latest)",
    "reason": "rolling-alias",
    "detail": "Rolling `-latest` alias whose underlying release changes silently.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/mistral/devstral-medium-latest.toml"
  },
  {
    "id": "mistral/magistral-medium-latest",
    "publisher": "mistral",
    "name": "Magistral Medium (latest)",
    "reason": "rolling-alias",
    "detail": "Rolling `-latest` alias whose underlying release changes silently.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/mistral/magistral-medium-latest.toml"
  },
  {
    "id": "mistral/ministral-3b",
    "publisher": "mistral",
    "name": "Ministral 3B",
    "reason": "missing-evidence",
    "detail": "Closed in models.dev (open_weights=false) with no first-party listing: only one third-party gateway (kilo) lists it, so no price list or model card supports a tier.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d43f0a24289c13545a2f71ecd47d39027d5f6e30/models/mistral/ministral-3b.toml"
  },
  {
    "id": "mistral/mistral-large-latest",
    "publisher": "mistral",
    "name": "Mistral Large (latest)",
    "reason": "rolling-alias",
    "detail": "Rolling `-latest` alias whose underlying release changes silently.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/mistral/mistral-large-latest.toml"
  },
  {
    "id": "mistral/mistral-medium-2604",
    "publisher": "mistral",
    "name": "Mistral Medium 3.5",
    "reason": "missing-evidence",
    "detail": "Marked open_weights=true, but Hugging Face returned license=\"other\" with no license_name, leaving normalized_license null.",
    "evidence": "https://huggingface.co/mistralai/Mistral-Medium-3.5-128B"
  },
  {
    "id": "mistral/mistral-medium-latest",
    "publisher": "mistral",
    "name": "Mistral Medium (latest)",
    "reason": "rolling-alias",
    "detail": "Rolling `-latest` alias whose underlying release changes silently.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/mistral/mistral-medium-latest.toml"
  },
  {
    "id": "mistral/mistral-small-latest",
    "publisher": "mistral",
    "name": "Mistral Small (latest)",
    "reason": "rolling-alias",
    "detail": "Rolling `-latest` alias whose underlying release changes silently.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/mistral/mistral-small-latest.toml"
  },
  {
    "id": "mistral/mixtral-8x22b-instruct",
    "publisher": "mistral",
    "name": "Mixtral 8x22B Instruct",
    "reason": "opaque-size",
    "detail": "Published with expert-count shorthand (8x22B) rather than verifiable total and active physical parameter counts in the catalogue record.",
    "evidence": "https://huggingface.co/mistralai/Mixtral-8x22B-Instruct-v0.1"
  },
  {
    "id": "mistral/mixtral-8x7b-instruct-v0.1",
    "publisher": "mistral",
    "name": "Mixtral 8x7B Instruct v0.1",
    "reason": "opaque-size",
    "detail": "Published with expert-count shorthand (8x7B) rather than verifiable total and active physical parameter counts in the catalogue record.",
    "evidence": "https://huggingface.co/mistralai/Mixtral-8x7B-Instruct-v0.1"
  },
  {
    "id": "mistral/pixtral-large-2502",
    "publisher": "mistral",
    "name": "Pixtral Large (25.02)",
    "reason": "slot-collision",
    "conflicts_with": "model:mistral/text/ultra:4",
    "detail": "Parallel closed vision-language flagship family (pixtral-large) occupying the same model:mistral/text/ultra slot as mistral-large.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/mistral/pixtral-large-2502.toml"
  },
  {
    "id": "mistral/pixtral-large-latest",
    "publisher": "mistral",
    "name": "Pixtral Large (latest)",
    "reason": "rolling-alias",
    "detail": "Rolling `-latest` alias whose underlying release changes silently.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/mistral/pixtral-large-latest.toml"
  },
  {
    "id": "mistral/voxtral-mini-3b-2507",
    "publisher": "mistral",
    "name": "Voxtral Mini 3B 2507",
    "reason": "slot-collision",
    "conflicts_with": "model:mistral/text/nano-open/3b:3",
    "detail": "Parallel audio-input 3B Apache-2.0 text family (voxtral-mini) colliding with ministral-3-3b on model:mistral/text/nano-open/3b.",
    "evidence": "https://huggingface.co/mistralai/Voxtral-Mini-3B-2507"
  },
  {
    "id": "mistral/voxtral-small-24b-2507",
    "publisher": "mistral",
    "name": "Voxtral Small 24B 2507",
    "reason": "slot-collision",
    "conflicts_with": "model:mistral/text/core-open/24b:3.2",
    "detail": "Parallel audio-input 24B Apache-2.0 text family (voxtral-small) colliding with mistral-small 24B on model:mistral/text/core-open/24b.",
    "evidence": "https://huggingface.co/mistralai/Voxtral-Small-24B-2507"
  },
  {
    "id": "mistral/voxtral-small-latest",
    "publisher": "mistral",
    "name": "Voxtral Small (latest)",
    "reason": "rolling-alias",
    "detail": "Rolling `-latest` alias whose underlying release changes silently.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/mistral/voxtral-small-latest.toml"
  },
  {
    "id": "moonshotai/kimi-k2-thinking",
    "publisher": "moonshotai",
    "name": "Kimi K2 Thinking",
    "reason": "parameter-split",
    "conflicts_with": "model:moonshotai/text/core-weights:2",
    "detail": "Extended-reasoning mode of Kimi K2 exposed as a separate model ID rather than a reasoning effort parameter.",
    "evidence": "https://huggingface.co/moonshotai/Kimi-K2-Thinking"
  },
  {
    "id": "moonshotai/kimi-k2-thinking-turbo",
    "publisher": "moonshotai",
    "name": "Kimi K2 Thinking Turbo",
    "reason": "parameter-split",
    "conflicts_with": "model:moonshotai/text/core-weights:2",
    "detail": "Extended-reasoning and turbo latency mode of Kimi K2 exposed as a separate model ID.",
    "evidence": "https://huggingface.co/moonshotai/Kimi-K2-Thinking"
  },
  {
    "id": "moonshotai/kimi-k2.7-code-highspeed",
    "publisher": "moonshotai",
    "name": "Kimi K2.7 Code Highspeed",
    "reason": "parameter-split",
    "conflicts_with": "model:moonshotai/text/core-code-weights:2.7",
    "detail": "Low-latency serving tier of Kimi K2.7 Code exposed as a separate model ID rather than a deployment parameter.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/moonshotai/kimi-k2.7-code-highspeed.toml"
  },
  {
    "id": "nvidia/llama-nemotron-embed-vl-1b-v2",
    "publisher": "nvidia",
    "name": "Llama Nemotron Embed VL 1B v2",
    "reason": "slot-collision",
    "conflicts_with": "model:nvidia/embed/core-weights/1b:2",
    "detail": "Vision-language sibling of llama-nemotron-embed-1b-v2 with the same size and version on the model:nvidia/embed/core-weights/1b slot.",
    "evidence": "https://huggingface.co/nvidia/llama-nemotron-embed-vl-1b-v2"
  },
  {
    "id": "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
    "publisher": "nvidia",
    "name": "Nemotron 3 Nano Omni 30B A3B Reasoning",
    "reason": "slot-collision",
    "conflicts_with": "model:nvidia/text/light-weights:3",
    "detail": "Parallel omni-input Nemotron 3 Nano variant colliding on the same model:nvidia/text/light-weights slot and version as nemotron-3-nano-30b-a3b.",
    "evidence": "https://huggingface.co/nvidia/Nemotron-3-Nano-Omni-30B-A3B-Reasoning-BF16"
  },
  {
    "id": "nvidia/nemotron-3.5-super-120b-a12b",
    "publisher": "nvidia",
    "name": "Nemotron 3.5 Super 120B A12B",
    "reason": "missing-evidence",
    "detail": "Marked open_weights=true with no verifiable licence in raw_license or hf_license and no Hugging Face weights URL.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/nvidia/nemotron-3.5-super-120b-a12b.toml"
  },
  {
    "id": "nvidia/nemotron-cascade-2-30b-a3b",
    "publisher": "nvidia",
    "name": "Nemotron Cascade 2 30B A3B",
    "reason": "slot-collision",
    "conflicts_with": "model:nvidia/text/light-weights",
    "detail": "Parallel Nemotron Cascade family whose number (2) is not a release of the Nano lineup holding the model:nvidia/text/light-weights slot.",
    "evidence": "https://huggingface.co/nvidia/Nemotron-Cascade-2-30B-A3B"
  },
  {
    "id": "nvidia/nemotron-voicechat",
    "publisher": "nvidia",
    "name": "Nemotron VoiceChat",
    "reason": "missing-evidence",
    "detail": "The Hugging Face link points to an 11B checkpoint released in 2026-08, not the 12B NIM release of 2026-03 this record describes, so its licence cannot be verified.",
    "evidence": "https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B"
  },
  {
    "id": "openai/gpt-5-chat-latest",
    "publisher": "openai",
    "name": "GPT-5 Chat (latest)",
    "reason": "rolling-alias",
    "detail": "Unpinned *-chat-latest rolling alias whose underlying checkpoint changes silently.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-5-chat-latest.toml"
  },
  {
    "id": "openai/gpt-5.1-chat-latest",
    "publisher": "openai",
    "name": "GPT-5.1 Chat",
    "reason": "rolling-alias",
    "detail": "Unpinned *-chat-latest rolling alias whose underlying checkpoint changes silently.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-5.1-chat-latest.toml"
  },
  {
    "id": "openai/gpt-5.2-chat-latest",
    "publisher": "openai",
    "name": "GPT-5.2 Chat",
    "reason": "rolling-alias",
    "detail": "Unpinned *-chat-latest rolling alias whose underlying checkpoint changes silently.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-5.2-chat-latest.toml"
  },
  {
    "id": "openai/gpt-5.3-chat-latest",
    "publisher": "openai",
    "name": "GPT-5.3 Chat (latest)",
    "reason": "rolling-alias",
    "detail": "Unpinned *-chat-latest rolling alias whose underlying checkpoint changes silently.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-5.3-chat-latest.toml"
  },
  {
    "id": "openai/gpt-5.3-codex-spark",
    "publisher": "openai",
    "name": "GPT-5.3 Codex Spark",
    "reason": "slot-collision",
    "conflicts_with": "model:openai/text/core-code:5.3",
    "detail": "Parallel Codex Spark release on 2026-02-05 with identical pricing ($1.75/$14) and description, colliding on model:openai/text/core-code:5.3.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-5.3-codex-spark.toml"
  },
  {
    "id": "openai/gpt-5.4-image-2",
    "publisher": "openai",
    "name": "GPT-5.4 Image 2",
    "reason": "slot-collision",
    "conflicts_with": "model:openai/image/core:2",
    "detail": "Parallel image model released on 2026-04-21 colliding on the openai/image/core:2 slot held by first-party openai/gpt-image-2.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-5.4-image-2.toml"
  },
  {
    "id": "openai/gpt-5.5-instant",
    "publisher": "openai",
    "name": "GPT-5.5 Instant",
    "reason": "parameter-split",
    "conflicts_with": "model:openai/text/core:5.5",
    "detail": "Low-latency serving variant of GPT-5.5 at identical pricing ($5/$30) exposed as a separate model ID (SPEC.md section 3.3 / 5.1).",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-5.5-instant.toml"
  },
  {
    "id": "openai/gpt-6-astra-fast",
    "publisher": "openai",
    "name": "GPT-6 Astra (Fast)",
    "reason": "parameter-split",
    "conflicts_with": "model:openai/text/ultra:6",
    "detail": "Low-latency serving variant of GPT-6 Astra exposed as a separate model ID (SPEC.md section 3.3 / 5.1).",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-6-astra-fast.toml"
  },
  {
    "id": "openai/gpt-image-2.5-flare",
    "publisher": "openai",
    "name": "GPT Image 2.5 Flare",
    "reason": "missing-evidence",
    "detail": "Published alongside gpt-image-2.5-sunburst with identical description, zero pricing data, and no parameter count; tier cannot be assigned without guessing.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-image-2.5-flare.toml"
  },
  {
    "id": "openai/gpt-image-2.5-sunburst",
    "publisher": "openai",
    "name": "GPT Image 2.5 Sunburst",
    "reason": "missing-evidence",
    "detail": "Published alongside gpt-image-2.5-flare with identical description, zero pricing data, and no parameter count; tier cannot be assigned without guessing.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/openai/gpt-image-2.5-sunburst.toml"
  },
  {
    "id": "openbmb/minicpm-v-4.7-1b",
    "publisher": "openbmb",
    "name": "MiniCPM-V 4.7 1B",
    "reason": "slot-collision",
    "conflicts_with": "model:openbmb/text/nano-open/1b:5",
    "detail": "Parallel 1B vision-language family (minicpm-v) with text output collides on the openbmb/text/nano-open/1b slot held by primary minicpm5-1b.",
    "evidence": "https://huggingface.co/openbmb/MiniCPM-V-4.7-1B"
  },
  {
    "id": "perplexity/sonar-reasoning-pro",
    "publisher": "perplexity",
    "name": "Sonar Reasoning Pro",
    "reason": "parameter-split",
    "conflicts_with": "model:perplexity/text/high:1",
    "detail": "Reasoning-mode variant of Sonar Pro exposed as a separate model ID rather than a request parameter.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/perplexity/sonar-reasoning-pro.toml"
  },
  {
    "id": "sdaia/allam-2-7b",
    "publisher": "sdaia",
    "name": "ALLaM-2-7b",
    "reason": "missing-evidence",
    "detail": "Marked open_weights=true, but the Hugging Face weights repository returned HTTP 401 and raw_license is null, leaving normalized_license unverifiable.",
    "evidence": "https://huggingface.co/ALLaM-AI/ALLaM-2.0-7B-Instruct"
  },
  {
    "id": "stepfun/step-5-preview",
    "publisher": "stepfun",
    "name": "Step 5 Preview",
    "reason": "missing-evidence",
    "detail": "Marked open_weights=true, but Hugging Face returned license=\"other\" with a custom LICENSE.txt and normalized_license is null.",
    "evidence": "https://huggingface.co/stepfun-ai/Step-5-Preview"
  },
  {
    "id": "tencent/hy3-preview",
    "publisher": "tencent",
    "name": "Hy3 preview",
    "reason": "missing-evidence",
    "detail": "Marked `open_weights: true`, but Hugging Face returned `license: \"other\"` with no `license_name`, leaving `normalized_license: null`.",
    "evidence": "https://huggingface.co/tencent/Hy3-preview"
  },
  {
    "id": "typesafe/jev-latest",
    "publisher": "typesafe",
    "name": "Jev",
    "reason": "rolling-alias",
    "detail": "Rolling `-latest` alias whose underlying release changes silently.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/typesafe/jev-latest.toml"
  },
  {
    "id": "unbiased/pareto",
    "publisher": "unbiased",
    "name": "Pareto",
    "reason": "rolling-alias",
    "detail": "Unpinned rolling pointer sharing first_party_id `pareto` with the versioned `unbiased/pareto-26.10` release.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/unbiased/pareto.toml"
  },
  {
    "id": "xai/grok-4-fast-non-reasoning",
    "publisher": "xai",
    "name": "X-Ai/Grok-4-Fast-Non-Reasoning",
    "reason": "parameter-split",
    "conflicts_with": "model:xai/text/light:4",
    "detail": "Fast latency and non-reasoning parameter variant of Grok 4 rather than a distinct model release.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/xai/grok-4-fast-non-reasoning.toml"
  },
  {
    "id": "xai/grok-4.1-fast",
    "publisher": "xai",
    "name": "Grok 4.1 Fast",
    "reason": "parameter-split",
    "conflicts_with": "model:xai/text/light:4.1",
    "detail": "Non-reasoning variant of Grok 4.1 Fast; reasoning mode is a request parameter rather than a separate model URI.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/xai/grok-4.1-fast.toml"
  },
  {
    "id": "xai/grok-4.20-0309-non-reasoning",
    "publisher": "xai",
    "name": "Grok 4.20 (Non-Reasoning)",
    "reason": "parameter-split",
    "conflicts_with": "model:xai/text/core:4.20",
    "detail": "Non-reasoning toggle variant of Grok 4.20 (`0309`), which is a request parameter rather than a separate model URI.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/xai/grok-4.20-0309-non-reasoning.toml"
  },
  {
    "id": "xai/grok-4.20-multi-agent-0309",
    "publisher": "xai",
    "name": "Grok 4.20 Multi-Agent",
    "reason": "parameter-split",
    "conflicts_with": "model:xai/text/core:4.20",
    "detail": "Multi-agent parallel execution variant of Grok 4.20 (0309) at identical pricing ($1.25/$2.50), exposed as a separate model ID rather than a request/orchestration mode.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/2548b4583cce12f2bb3ec91f008472680310ff2e/models/xai/grok-4.20-multi-agent-0309.toml"
  },
  {
    "id": "xiaomi/mimo-v2.5-pro-ultraspeed",
    "publisher": "xiaomi",
    "name": "MiMo-V2.5-Pro-UltraSpeed",
    "reason": "parameter-split",
    "conflicts_with": "model:xiaomi/text/high-open:2.5",
    "detail": "Ultra-low-latency serving tier of MiMo-V2.5-Pro exposed as a separate model ID rather than a deployment parameter.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/xiaomi/mimo-v2.5-pro-ultraspeed.toml"
  },
  {
    "id": "xiaomi/mimo-v2.6-pro-ultraspeed",
    "publisher": "xiaomi",
    "name": "MiMo-V2.6-Pro-UltraSpeed",
    "reason": "parameter-split",
    "conflicts_with": "model:xiaomi/text/high-open:2.6",
    "detail": "Ultra-low-latency serving tier of MiMo-V2.6-Pro exposed as a separate model ID rather than a deployment parameter.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/xiaomi/mimo-v2.6-pro-ultraspeed.toml"
  },
  {
    "id": "xiaomi/mimo-v2.6-flash-mopd",
    "publisher": "xiaomi",
    "name": "MiMo-V2.6-Flash-MOPD",
    "reason": "slot-collision",
    "conflicts_with": "model:xiaomi/text/core-open:2.6",
    "detail": "Separate MIT checkpoint of MiMo-V2.6-Flash distilled from domain teachers to cut repeated tool calls, with no registered special to tell it apart, colliding with `xiaomi/mimo-v2.6-flash` on `model:xiaomi/text/core-open:2.6`.",
    "evidence": "https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Flash-MOPD"
  },
  {
    "id": "zhipuai/glm-4.5v",
    "publisher": "zhipuai",
    "name": "GLM-4.5V",
    "reason": "slot-collision",
    "conflicts_with": "model:zhipuai/text/core-open:4.5",
    "detail": "Vision-input GLM-4.5V release with text output colliding on the model:zhipuai/text/core-open:4.5 slot held by glm-4.5.",
    "evidence": "https://huggingface.co/zai-org/GLM-4.5V"
  },
  {
    "id": "zhipuai/glm-4.6v",
    "publisher": "zhipuai",
    "name": "GLM-4.6V",
    "reason": "slot-collision",
    "conflicts_with": "model:zhipuai/text/core-open:4.6",
    "detail": "Vision-input GLM-4.6V release with text output colliding on the model:zhipuai/text/core-open:4.6 slot held by glm-4.6.",
    "evidence": "https://huggingface.co/zai-org/GLM-4.6V"
  },
  {
    "id": "zhipuai/glm-5v-turbo",
    "publisher": "zhipuai",
    "name": "GLM-5V-Turbo",
    "reason": "slot-collision",
    "conflicts_with": "model:zhipuai/text/core:5",
    "detail": "Closed vision-input GLM-5V-Turbo variant with text output colliding on the model:zhipuai/text/core:5 slot held by glm-5-turbo.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/d204e701c4446a0d60885696b6b4664a0e55b3ec/models/zhipuai/glm-5v-turbo.toml"
  },
  {
    "id": "moonshotai/kimi-k3.1-pro-highspeed",
    "publisher": "moonshotai",
    "name": "Kimi K3.1 Pro Highspeed",
    "reason": "parameter-split",
    "conflicts_with": "model:moonshotai/text/ultra-weights:3.1",
    "detail": "Faster serving tier of Kimi K3.1 Pro exposed as a separate model ID rather than a deployment parameter.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/5267124fbd7665693c3375422215717210078d34/models/moonshotai/kimi-k3.1-pro-highspeed.toml"
  },
  {
    "id": "openai/gpt-6-astra-healthcare",
    "publisher": "openai",
    "name": "GPT-6 Astra Healthcare",
    "reason": "parameter-split",
    "conflicts_with": "model:openai/text/ultra:6",
    "detail": "GPT-6 Astra with a clinical harness and a medical search index, at the same price as GPT-6 Astra: a harness exposed as a separate model ID, not separate weights.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/5267124fbd7665693c3375422215717210078d34/models/openai/gpt-6-astra-healthcare.toml"
  },
  {
    "id": "openai/gpt-6.2-astra-healthcare",
    "publisher": "openai",
    "name": "GPT-6.2 Astra Healthcare",
    "reason": "parameter-split",
    "conflicts_with": "model:openai/text/ultra:6.2",
    "detail": "GPT-6.2 Astra with a clinical harness and a medical search index, at the same price as GPT-6.2 Astra: a harness exposed as a separate model ID, not separate weights.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/5267124fbd7665693c3375422215717210078d34/models/openai/gpt-6.2-astra-healthcare.toml"
  },
  {
    "id": "openai/gpt-6.1-sol-healthcare",
    "publisher": "openai",
    "name": "GPT-6.1 Sol Healthcare",
    "reason": "parameter-split",
    "conflicts_with": "model:openai/text/core:6.1",
    "detail": "GPT-6.1 Sol with a clinical harness and a medical search index, at the same price as GPT-6.1 Sol: a harness exposed as a separate model ID, not separate weights.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/5267124fbd7665693c3375422215717210078d34/models/openai/gpt-6.1-sol-healthcare.toml"
  },
  {
    "id": "openai/gpt-6.2-sol-healthcare",
    "publisher": "openai",
    "name": "GPT-6.2 Sol Healthcare",
    "reason": "parameter-split",
    "conflicts_with": "model:openai/text/core:6.2",
    "detail": "GPT-6.2 Sol with a clinical harness and a medical search index, at the same price as GPT-6.2 Sol: a harness exposed as a separate model ID, not separate weights.",
    "evidence": "https://github.com/anomalyco/models.dev/blob/5267124fbd7665693c3375422215717210078d34/models/openai/gpt-6.2-sol-healthcare.toml"
  }
];

export const SKIPPED = [
  {
    "id": "abacusai/dracarys-llama-3.1-70b-instruct",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party coding fine-tune of Meta's Llama 3.1 70B Instruct."
  },
  {
    "id": "aion-labs/aion-rp-llama-3.1-8b",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party fine-tune of Meta Llama 3.1 8B (\"Open Llama instruction model\")."
  },
  {
    "id": "aisingapore/gemma-sea-lion-v4-27b-it",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party Southeast Asian language fine-tune of Google's Gemma 3 27B."
  },
  {
    "id": "alibaba/qwen3-max-preview",
    "skip_reason": "snapshot-duplicate",
    "detail": "Superseded pre-release preview snapshot of Qwen3 Max (model:alibaba/text/ultra:3) with no first-party or extended-host listing."
  },
  {
    "id": "alibaba/qwen3.8-max-0902",
    "skip_reason": "snapshot-duplicate",
    "detail": "Dated snapshot (0902) of Qwen3.8 Max already registered as model:alibaba/text/ultra:3.8."
  },
  {
    "id": "alibaba/qwen3.8-max-preview",
    "skip_reason": "snapshot-duplicate",
    "detail": "Superseded pre-release preview snapshot of Qwen3.8 Max (model:alibaba/text/ultra:3.8) with no first-party or extended-host listing."
  },
  {
    "id": "allenai/olmocr-2-7b",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party OCR fine-tune by Ai2 of Alibaba's Qwen2.5-VL 7B Instruct (SPEC section 3.7)."
  },
  {
    "id": "amazon/nova-2-lite-v1",
    "skip_reason": "snapshot-duplicate",
    "detail": "API-versioned `-v1` duplicate of the 2025-12-02 Nova 2 Lite release already registered via `amazon/nova-2-lite` (`model:amazon/text/light:2`)."
  },
  {
    "id": "amazon/nova-lite-v1",
    "skip_reason": "snapshot-duplicate",
    "detail": "API-versioned `-v1` duplicate of the Nova Lite 1.0 release already registered via `amazon/nova-lite` (`model:amazon/text/light:1`)."
  },
  {
    "id": "amazon/nova-micro-v1",
    "skip_reason": "snapshot-duplicate",
    "detail": "API-versioned `-v1` duplicate of the Nova Micro 1.0 release already registered via `amazon/nova-micro` (`model:amazon/text/nano:1`)."
  },
  {
    "id": "amazon/nova-pro-v1",
    "skip_reason": "snapshot-duplicate",
    "detail": "API-versioned `-v1` duplicate of the Nova Pro 1.0 release already registered via `amazon/nova-pro` (`model:amazon/text/core:1`)."
  },
  {
    "id": "anthracite-org/magnum-v4-72b",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party community fine-tune (Magnum v4 72B) of another publisher's base weights."
  },
  {
    "id": "anthropic/claude-haiku-4-5-20251001",
    "skip_reason": "snapshot-duplicate",
    "detail": "Dated snapshot duplicate of anthropic/claude-haiku-4-5."
  },
  {
    "id": "anthropic/claude-mythos-5",
    "skip_reason": "restricted-not-on-sale",
    "detail": "Restricted Claude Mythos 5 model granted to selected operators only; not publicly on sale for registry inclusion (SPEC.md section 5.1 / 8)."
  },
  {
    "id": "anthropic/claude-mythos-5-1",
    "skip_reason": "restricted-not-on-sale",
    "detail": "Restricted Claude Mythos 5.1 model with zero providers on sale (provider_count: 0)."
  },
  {
    "id": "anthropic/claude-opus-4-1-20250805",
    "skip_reason": "snapshot-duplicate",
    "detail": "Dated snapshot duplicate of anthropic/claude-opus-4-1."
  },
  {
    "id": "anthropic/claude-opus-4-20250514",
    "skip_reason": "snapshot-duplicate",
    "detail": "Dated snapshot duplicate of anthropic/claude-opus-4-0."
  },
  {
    "id": "anthropic/claude-opus-4-5-20251101",
    "skip_reason": "snapshot-duplicate",
    "detail": "Dated snapshot duplicate of anthropic/claude-opus-4-5."
  },
  {
    "id": "anthropic/claude-sonnet-4-20250514",
    "skip_reason": "snapshot-duplicate",
    "detail": "Dated snapshot duplicate of anthropic/claude-sonnet-4-0."
  },
  {
    "id": "anthropic/claude-sonnet-4-5-20250929",
    "skip_reason": "snapshot-duplicate",
    "detail": "Dated snapshot duplicate of anthropic/claude-sonnet-4-5."
  },
  {
    "id": "apodex/apodex-1.1-mini",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party fine-tune of Alibaba's Qwen3.5-35B-A3B (SPEC section 3.7)."
  },
  {
    "id": "baichuan/baichuan-m2-32b",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party medical fine-tune by Baichuan of Alibaba's Qwen2.5 32B (SPEC section 3.7)."
  },
  {
    "id": "cognitivecomputations/dolphin-mistral-24b-venice-edition",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party uncensored derivation of Mistral Small 24B."
  },
  {
    "id": "cohere/command-a",
    "skip_reason": "snapshot-duplicate",
    "detail": "Undated OpenRouter/Vercel duplicate of the 2025-03-13 Command A release already registered via cohere/command-a-03-2025."
  },
  {
    "id": "deepseek/deepseek-chat-v3-0324",
    "skip_reason": "snapshot-duplicate",
    "detail": "OpenRouter slug duplicate of the 2025-03-24 DeepSeek V3 0324 release already registered via deepseek/deepseek-v3-0324."
  },
  {
    "id": "deepseek/deepseek-chat-v3.1",
    "skip_reason": "snapshot-duplicate",
    "detail": "OpenRouter slug duplicate of the 2025-08-21 DeepSeek-V3.1 release already registered via deepseek/deepseek-v3.1."
  },
  {
    "id": "deepseek/deepseek-r1-0528-qwen3-8b",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party distillation by DeepSeek onto Alibaba Qwen3 8B base weights (SPEC section 3.7 and 5.1)."
  },
  {
    "id": "deepseek/deepseek-r1-distill-qwen-32b",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party distillation by DeepSeek onto Alibaba Qwen 2.5 32B base weights (SPEC section 3.7 and 5.1)."
  },
  {
    "id": "deepseek/deepseek-v4-flash-0423",
    "skip_reason": "snapshot-duplicate",
    "detail": "Dated initial snapshot (0423) duplicating the undated deepseek/deepseek-v4-flash release (model:deepseek/text/light-open:4)."
  },
  {
    "id": "deepseek/deepseek-v4-flash-0731",
    "skip_reason": "snapshot-duplicate",
    "detail": "Dated snapshot (0731) duplicating the undated deepseek/deepseek-v4-flash release (model:deepseek/text/light-open:4)."
  },
  {
    "id": "deepseek/deepseek-v4-pro-0423",
    "skip_reason": "snapshot-duplicate",
    "detail": "Dated initial snapshot (0423) duplicating the undated deepseek/deepseek-v4-pro release (model:deepseek/text/ultra-open:4)."
  },
  {
    "id": "deepseek/deepseek-v4-pro-0813",
    "skip_reason": "snapshot-duplicate",
    "detail": "Dated snapshot (0813) duplicating the undated deepseek/deepseek-v4-pro release (model:deepseek/text/ultra-open:4)."
  },
  {
    "id": "deepseek/deepseek-v4.1-flash-1017",
    "skip_reason": "snapshot-duplicate",
    "detail": "Dated snapshot (1017) duplicating the undated deepseek/deepseek-v4.1-flash release (model:deepseek/text/light-open:4.1)."
  },
  {
    "id": "fireworks/ember-1",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party specialization built on Moonshot AI's Kimi K3 base model."
  },
  {
    "id": "google/gemini-2.5-flash-lite-preview-06-17",
    "skip_reason": "snapshot-duplicate",
    "detail": "Dated preview snapshot (`06-17`) of `google/gemini-2.5-flash-lite` (`model:google/text/nano:2.5`)."
  },
  {
    "id": "google/gemini-2.5-flash-lite-preview-09-2025",
    "skip_reason": "snapshot-duplicate",
    "detail": "Dated preview snapshot (`09-2025`) of `google/gemini-2.5-flash-lite` (`model:google/text/nano:2.5`)."
  },
  {
    "id": "google/gemini-2.5-flash-preview-05-20",
    "skip_reason": "snapshot-duplicate",
    "detail": "Dated preview snapshot (`05-20`) of `google/gemini-2.5-flash` (`model:google/text/core:2.5`)."
  },
  {
    "id": "google/gemini-2.5-pro-preview",
    "skip_reason": "snapshot-duplicate",
    "detail": "Dated preview snapshot (`06-05`) of `google/gemini-2.5-pro` (`model:google/text/ultra:2.5`)."
  },
  {
    "id": "google/gemini-3-pro-image-preview",
    "skip_reason": "snapshot-duplicate",
    "detail": "Pre-GA preview snapshot superseded by `google/gemini-3-pro-image` (`model:google/image/ultra:3`)."
  },
  {
    "id": "google/gemini-3.1-flash-image-preview",
    "skip_reason": "snapshot-duplicate",
    "detail": "Pre-GA preview snapshot superseded by `google/gemini-3.1-flash-image` (`model:google/image/core:3.1`)."
  },
  {
    "id": "google/gemini-3.1-flash-lite-preview",
    "skip_reason": "snapshot-duplicate",
    "detail": "Deprecated pre-GA preview snapshot superseded by `google/gemini-3.1-flash-lite` (`model:google/text/nano:3.1`)."
  },
  {
    "id": "gryphe/mythomax-l2-13b",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party Llama 2 merge combining MythoLogic and Huginn."
  },
  {
    "id": "levanto/levanto-sage-v1.4",
    "skip_reason": "restricted-not-on-sale",
    "detail": "Closed proprietary decision model with zero listed providers (provider_count=0, native_preview={})."
  },
  {
    "id": "mancer/weaver",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party community derivation hosted on OpenRouter."
  },
  {
    "id": "meta/muse-wonder-full",
    "skip_reason": "restricted-not-on-sale",
    "detail": "Announced in the Muse Wonder model card but not publicly on sale (zero providers and no pricing in models.dev)."
  },
  {
    "id": "microsoft/mai-code-1-flash",
    "skip_reason": "restricted-not-on-sale",
    "detail": "Closed model with native_preview={} and provider_count=0 (not publicly served on any host in models.dev)."
  },
  {
    "id": "microsoft/wizardlm-2-8x22b",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party instruction fine-tune of Mistral's Mixtral 8x22B weights (also uses opaque 8x22b expert-count shorthand)."
  },
  {
    "id": "mindlab/macaron-v1-tall",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party Mixture-of-LoRA fine-tune based on Alibaba's Qwen3.6 weights."
  },
  {
    "id": "mindlab/macaron-v1-venti",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party Mixture-of-LoRA fine-tune based on Zhipu's GLM-5.2 weights."
  },
  {
    "id": "minimax/image-01",
    "skip_reason": "restricted-not-on-sale",
    "detail": "Closed proprietary model with zero active providers (`provider_count: 0`, `native_preview: {}`)."
  },
  {
    "id": "minimax/MiniMax-M3.1-Flash-Preview",
    "skip_reason": "snapshot-duplicate",
    "detail": "Deprecated pre-GA preview snapshot (2026-09-27) superseded by `minimax/MiniMax-M3.1-Flash` (`model:minimax/text/light-weights:3.1`)."
  },
  {
    "id": "minimax/MiniMax-Text-01",
    "skip_reason": "restricted-not-on-sale",
    "detail": "Closed proprietary model with zero active providers (`provider_count: 0`, `native_preview: {}`)."
  },
  {
    "id": "mistral/ministral-14b",
    "skip_reason": "snapshot-duplicate",
    "detail": "Duplicate catalogue record for the 2025-12-02 Ministral 3 14B release already registered via mistral/ministral-3-14b-instruct-2512."
  },
  {
    "id": "mistral/ministral-14b-2512",
    "skip_reason": "snapshot-duplicate",
    "detail": "API-slug duplicate for the 2025-12-02 Ministral 3 14B release (first_party_id ministral-14b-2512) already registered via mistral/ministral-3-14b-instruct-2512."
  },
  {
    "id": "mistral/ministral-3b-2512",
    "skip_reason": "snapshot-duplicate",
    "detail": "API-slug duplicate for the 2025-12-02 Ministral 3 3B release (first_party_id ministral-3b-2512) already registered via mistral/ministral-3-3b-instruct-2512."
  },
  {
    "id": "mistral/ministral-8b-2512",
    "skip_reason": "snapshot-duplicate",
    "detail": "API-slug duplicate for the 2025-12-02 Ministral 3 8B release (first_party_id ministral-8b-2512) already registered via mistral/ministral-3-8b-instruct-2512."
  },
  {
    "id": "mistral/mistral-medium-2505",
    "skip_reason": "snapshot-duplicate",
    "detail": "Dated snapshot duplicate (2505) for the 2025-05-07 Mistral Medium 3 release already registered via mistral/mistral-medium-3."
  },
  {
    "id": "mistral/mistral-small-3.1-24b-instruct",
    "skip_reason": "snapshot-duplicate",
    "detail": "Undated OpenRouter duplicate for the 2025-03-17 Mistral Small 3.1 24B release already registered via mistral/mistral-small-3-1-24b-instruct-2503."
  },
  {
    "id": "mistral/mistral-small-3.2-24b-instruct",
    "skip_reason": "snapshot-duplicate",
    "detail": "Undated OpenRouter duplicate for the 2025-06-20 Mistral Small 3.2 24B release already registered via mistral/mistral-small-2506."
  },
  {
    "id": "moonshotai/kimi-k2",
    "skip_reason": "snapshot-duplicate",
    "detail": "Duplicate of the 2025-07-11 Kimi K2 Instruct release already registered via moonshotai/kimi-k2-instruct (same Hugging Face repository)."
  },
  {
    "id": "nousresearch/hermes-2-pro-llama-3-8b",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party fine-tune of Meta Llama 3 8B weights under Llama 3 Community License."
  },
  {
    "id": "nousresearch/hermes-3-llama-3.1-405b",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party fine-tune of Meta Llama 3.1 405B weights."
  },
  {
    "id": "nousresearch/hermes-3-llama-3.1-70b",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party fine-tune of Meta Llama 3.1 70B weights."
  },
  {
    "id": "nousresearch/hermes-4-405b",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party Hermes 4 fine-tune built on Meta Llama 3.1 405B weights."
  },
  {
    "id": "nvidia/llama-3.1-nemotron-70b-instruct",
    "skip_reason": "third-party-derivation",
    "detail": "NVIDIA fine-tune of Meta's Llama 3.1 70B Instruct, under the Llama 3.1 Community License."
  },
  {
    "id": "nvidia/llama-3.1-nemotron-safety-guard-8b-v3",
    "skip_reason": "third-party-derivation",
    "detail": "NVIDIA safety fine-tune of Meta's Llama 3.1 8B Instruct."
  },
  {
    "id": "nvidia/llama-3.1-nemotron-ultra-253b",
    "skip_reason": "third-party-derivation",
    "detail": "NVIDIA pruned and post-trained derivation of Meta's Llama 3.1 405B Instruct."
  },
  {
    "id": "nvidia/llama-3.3-nemotron-super-49b-v1",
    "skip_reason": "third-party-derivation",
    "detail": "NVIDIA pruned and post-trained derivation of Meta's Llama 3.3 70B Instruct."
  },
  {
    "id": "nvidia/llama-3.3-nemotron-super-49b-v1.5",
    "skip_reason": "third-party-derivation",
    "detail": "NVIDIA pruned and post-trained derivation of Meta's Llama 3.3 70B Instruct."
  },
  {
    "id": "nvidia/mistral-nemotron",
    "skip_reason": "restricted-not-on-sale",
    "detail": "Closed model with zero native hosts (native_preview: {}) and provider_count === 0 in models.dev."
  },
  {
    "id": "nvidia/nemotron-3-content-safety",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party safety fine-tune by NVIDIA of Google's Gemma 3 4B IT (SPEC section 3.7)."
  },
  {
    "id": "nvidia/nemotron-content-safety-reasoning-4b",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party safety fine-tune by NVIDIA of Google's Gemma 3 4B IT (SPEC section 3.7)."
  },
  {
    "id": "openai/gpt-4o-2024-05-13",
    "skip_reason": "snapshot-duplicate",
    "detail": "Dated snapshot duplicate of openai/gpt-4o."
  },
  {
    "id": "openai/gpt-4o-2024-08-06",
    "skip_reason": "snapshot-duplicate",
    "detail": "Dated snapshot duplicate of openai/gpt-4o."
  },
  {
    "id": "openai/gpt-4o-2024-11-20",
    "skip_reason": "snapshot-duplicate",
    "detail": "Dated snapshot duplicate of openai/gpt-4o."
  },
  {
    "id": "paperinstruments/ultramarine-1-flash",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party RL fine-tune by Paper Instruments built on Zhipu AI's GLM-5.3 Flash weights."
  },
  {
    "id": "openai/gpt-6-cyber",
    "skip_reason": "restricted-not-on-sale",
    "detail": "Restricted GPT-6 Cyber model with zero providers on sale (provider_count: 0)."
  },
  {
    "id": "particle-ai/particle-1",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party agentic coding post-train of DeepSeek V4.1 Flash."
  },
  {
    "id": "sao10k/l3-lunaris-8b",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party fine-tune/merge of Meta's Llama 3 8B."
  },
  {
    "id": "sao10k/l3.1-euryale-70b",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party fine-tune/merge of Meta's Llama 3.1 70B."
  },
  {
    "id": "sao10k/l3.3-euryale-70b",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party fine-tune/merge of Meta's Llama 3.3 70B."
  },
  {
    "id": "stepfun/step-3.5-flash-2603",
    "skip_reason": "snapshot-duplicate",
    "detail": "Dated snapshot duplicate (2603) pointing to the same Hugging Face weights and pricing as stepfun/step-3.5-flash."
  },
  {
    "id": "thedrummer/cydonia-24b-v4.1",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party community fine-tune (Cydonia 24B V4.1) of Mistral weights."
  },
  {
    "id": "thedrummer/skyfall-36b-v2",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party community fine-tune (Skyfall 36B V2) of another publisher's base weights."
  },
  {
    "id": "thedrummer/unslopnemo-12b",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party community fine-tune (UnslopNemo 12B) of Mistral Nemo 12B weights."
  },
  {
    "id": "trendyol/asure-12b",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party Turkish multimodal fine-tune built on Google's Gemma 3 12B."
  },
  {
    "id": "undi95/remm-slerp-l2-13b",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party SLERP merge of Llama 2 13B models."
  },
  {
    "id": "pipecat-ai/phonellm-mini-alpha-2",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party phone-agent fine-tune of NVIDIA Nemotron 3 Nano 30B-A3B (Hugging Face `base_model: nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B-BF16`)."
  },
  {
    "id": "prism-ml/ternary-bonsai-27b",
    "skip_reason": "third-party-derivation",
    "detail": "Third-party ternary-weight build of Alibaba's Qwen3.6 27B (Hugging Face `base_model: Qwen/Qwen3.6-27B`)."
  },
  {
    "id": "elorian-labs/glimpse-1.0",
    "skip_reason": "third-party-derivation",
    "detail": "Closed visual-reasoning post-train of an undisclosed open-weights base; same text scope as the base (SPEC.md section 3.7)."
  }
];
