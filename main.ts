import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const DEFAULT_OUTPUT_PATH = "/output/entry.txt";
const MAX_CODE_POINTS = 140;

const PERFORMANCE_REVIEW_LINE =
  "Q4 Review: 2/5. Actively seeks candid feedback, then hits Regenerate until I approve their promotion.";

/**
 * 解析命令行参数与环境变量，确定最终输出文件路径。
 * 支持 --out / --output / -o / --out-dir 以及 MAKEFUN_OUTPUT_DIR，默认返回 /output/entry.txt。
 */
function resolveOutputPath(argv: string[], env: NodeJS.ProcessEnv): string {
  let outFile: string | undefined;
  let outDir: string | undefined;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--out" || arg === "--output" || arg === "-o") {
      const next = argv[i + 1];
      if (!next || next.startsWith("-")) {
        throw new Error(`Missing value for ${arg}`);
      }
      outFile = next;
      i += 1;
    } else if (arg.startsWith("--out=")) {
      outFile = arg.slice("--out=".length);
    } else if (arg.startsWith("--output=")) {
      outFile = arg.slice("--output=".length);
    } else if (arg.startsWith("-o=")) {
      outFile = arg.slice("-o=".length);
    } else if (arg === "--out-dir") {
      const next = argv[i + 1];
      if (!next || next.startsWith("-")) {
        throw new Error("Missing value for --out-dir");
      }
      outDir = next;
      i += 1;
    } else if (arg.startsWith("--out-dir=")) {
      outDir = arg.slice("--out-dir=".length);
    }
  }

  if (outFile !== undefined) {
    const trimmed = outFile.trim();
    if (!trimmed) {
      throw new Error("Output file path must not be empty");
    }
    return resolve(trimmed);
  }
  if (outDir !== undefined) {
    const trimmed = outDir.trim();
    if (!trimmed) {
      throw new Error("Output directory path must not be empty");
    }
    return resolve(join(trimmed, "entry.txt"));
  }
  const envOutDir = env.MAKEFUN_OUTPUT_DIR?.trim();
  if (envOutDir) {
    return resolve(join(envOutDir, "entry.txt"));
  }
  return DEFAULT_OUTPUT_PATH;
}

/**
 * 校验单行绩效考评文本是否满足赛制门控：非空白、无控制字符/换行/BOM、长度 <= 140 码点。
 */
function validateEntry(text: string): string {
  if (text.charCodeAt(0) === 0xfeff) {
    throw new Error("Entry must not begin with a UTF-8 BOM");
  }
  if (text.trim().length === 0) {
    throw new Error("Entry must not be empty or whitespace-only");
  }
  for (const ch of text) {
    const code = ch.codePointAt(0) ?? 0;
    if (code < 0x20 || code === 0x7f) {
      throw new Error(`Entry contains disallowed control character U+${code.toString(16).toUpperCase()}`);
    }
  }
  const codePoints = Array.from(text).length;
  if (codePoints < 1 || codePoints > MAX_CODE_POINTS) {
    throw new Error(`Entry must be 1..${MAX_CODE_POINTS} code points, got ${codePoints}`);
  }
  return text;
}

function main(): void {
  const outputPath = resolveOutputPath(process.argv.slice(2), process.env);
  const entry = validateEntry(PERFORMANCE_REVIEW_LINE);

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, entry, { encoding: "utf8" });
}

main();
