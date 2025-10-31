// app/tos/page.tsx
import { fetchBlocksFromNotion } from "lib/fetchFromNotion";

export default async function TosPage() {
  const tos = await fetchBlocksFromNotion("NOTION_TOS_PAGE_ID");
  const blocks = tos;

  return (
    <div className="prose prose-neutral text-neutral">
      {blocks.map((block: any) => (
        <RenderBlock key={block.id} block={block} />
      ))}
    </div>
  );
}

function RenderBlock({ block, depth = 0 }: { block: any; depth?: number }) {
  const { type, children } = block;
  const content = block[type];

  if (!content) return null;

  const textElements = content.rich_text?.map((textObj: any, i: number) => {
    const { annotations, text, href } = textObj;
    const link = href ?? text.link?.url;
    const isLink = !!link;
    const isExternal = link?.startsWith("http");

    const classNames = [
      annotations.bold ? "font-bold" : "",
      annotations.italic ? "italic" : "",
      annotations.underline ? "underline" : "",
      annotations.strikethrough ? "text-warning-content" : "",
      annotations.code ? "font-mono bg-gray-100 px-1 py-0.5 rounded" : "",
      annotations.color !== "default" ? `text-${annotations.color}-500` : "",
      isLink ? "text-primary-content font-semibold underline" : "",
    ]
      .filter(Boolean)
      .join(" ");

    if (isLink) {
      return (
        <a
          key={i}
          href={link}
          className={classNames}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {text.content}
        </a>
      );
    }

    return (
      <span key={i} className={classNames}>
        {text.content}
      </span>
    );
  });

  let renderedBlock: React.ReactNode | null = null;

  switch (type) {
    case "heading_1":
      renderedBlock = (
        <h1 className="text-4xl font-bold text-center mt-10 mb-4">
          {textElements}
        </h1>
      );
      break;

    case "heading_2":
      renderedBlock = (
        <h2 className="text-2xl font-semibold mt-8 mb-3 text-left">
          {textElements}
        </h2>
      );
      break;

    case "heading_3":
      renderedBlock = (
        <h3 className="text-xl font-medium mt-6 mb-2 text-left">
          {textElements}
        </h3>
      );
      break;

    case "paragraph":
      renderedBlock = <p className="mb-4 text-justify">{textElements}</p>;
      break;

    case "bulleted_list_item": {
      const bulletSymbol = depth === 0 ? "•" : depth === 1 ? "○" : "↳";

      renderedBlock = (
        <li className="ml-4 mb-1 flex items-start">
          <span className="mr-2 select-none">{bulletSymbol}</span>
          <div>
            {textElements}
            {children && children.length > 0 && (
              <ul className="ml-4">
                {children.map((child: any) => (
                  <RenderBlock key={child.id} block={child} depth={depth + 1} />
                ))}
              </ul>
            )}
          </div>
        </li>
      );
      break;
    }

    case "numbered_list_item":
      renderedBlock = (
        <li className="list-decimal ml-6 mb-1">
          {textElements}
          {children && children.length > 0 && (
            <ol className="ml-4">
              {children.map((child: any) => (
                <RenderBlock key={child.id} block={child} depth={depth + 1} />
              ))}
            </ol>
          )}
        </li>
      );
      break;

    case "quote":
      renderedBlock = (
        <blockquote className="border-l-4 pl-4 italic text-gray-600">
          {textElements}
        </blockquote>
      );
      break;

    default:
      console.warn("Unhandled Notion block type:", type);
      renderedBlock = null;
  }

  // Recursively render children that aren't list items
  return (
    <>
      {renderedBlock}
      {type !== "bulleted_list_item" &&
        type !== "numbered_list_item" &&
        children &&
        children.length > 0 && (
          <div className="ml-4 border-l pl-4">
            {children.map((child: any) => (
              <RenderBlock key={child.id} block={child} depth={depth + 1} />
            ))}
          </div>
        )}
    </>
  );
}
