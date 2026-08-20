import Image from "next/image";

import imageIndex from "@/public/files/images.json";
import mockFiles from "@/data/mockdata.json";

export const dynamic = "force-dynamic";

function withoutExtension(fileName: string) {
  return fileName.replace(/\.[^/.]+$/, "");
}

export default async function Home() {
  const files = process.env.NODE_ENV === "production"
    ? mockFiles
    : await (async () => {
        const { default: prisma } = await import("@/lib/prisma");
        return prisma.file.findMany({ orderBy: { id: "asc" } });
      })();

  return (
    <main className="min-h-screen bg-[#f5f4ef] text-[#202522]">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col px-6 py-6 sm:px-10 lg:px-14">
        <header className="flex items-center justify-between border-b border-[#d8d8d0] pb-6">
          <a className="flex items-center gap-3" href="#home" aria-label="Home">
            <span className="grid h-9 w-9 grid-cols-2 gap-1 rounded-lg bg-[#de5c3b] p-1.5">
              <span className="rounded-sm bg-[#f5f4ef]" />
              <span className="rounded-sm bg-[#f5f4ef]" />
              <span className="rounded-sm bg-[#f5f4ef]" />
              <span className="rounded-sm bg-[#f5f4ef]" />
            </span>
            <span className="font-mono text-sm font-bold uppercase tracking-[0.22em]">File Explorer</span>
          </a>
          <nav aria-label="Main navigation">
            <ul className="flex items-center gap-6 text-sm font-medium text-[#6c726d] sm:gap-9">
              <li><a className="text-[#202522]" href="#home">Explorer</a></li>
              <li><a className="transition-colors hover:text-[#202522]" href="#library">Upload</a></li>
              <li><a className="transition-colors hover:text-[#202522]" href="#about">About</a></li>
            </ul>
          </nav>
          <button className="hidden rounded-full border border-[#c8cbc3] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:border-[#202522] sm:block">
            Sign in
          </button>
        </header>

        <section id="home" className="flex flex-1 flex-col justify-center py-16 sm:py-24">
          <div id="library" className="grid grid-cols-4 gap-4">
            {files.map((file, index) => {
              const image = imageIndex.find((entry) => entry.FileType === file.iconType);
              const fileName = withoutExtension(file.name);

              return (
                <div className={`tile${index === 0 ? " tile-featured" : ""}`} key={file.id}>
                  <span className="tile-icon">
                    <Image
                      src={image?.Path ?? "/files/file.png"}
                      alt={`${file.iconType} file icon`}
                      height={40}
                      width={40}
                    />
                  </span>
                  <strong>{fileName}</strong>
                  <small>{file.path}</small>
                </div>
              );
            })}
          </div>
        </section>

        <footer id="about" className="flex flex-col gap-2 border-t border-[#d8d8d0] pt-5 text-xs text-[#6c726d] sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 File Explorer</span>
          <span className="font-mono uppercase tracking-[0.16em]">{files.length} files</span>
          <a href="https://www.flaticon.com/free-icons/jpg" title="jpg icons">Jpg icons created by Dimitry Miroliubov - Flaticon</a>
        </footer>
      </div>
    </main>
  );
}
