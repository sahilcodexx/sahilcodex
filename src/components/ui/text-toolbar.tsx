"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { DropdownMenu, Popover, ToggleGroup } from "radix-ui";
import { AlignCenter, AlignLeft, AlignRight, AtSign, Bold, Check, ChevronDown, CodeXml, Highlighter, Italic, Link, Minus, Plus, RemoveFormatting, Strikethrough, Underline } from "lucide-react";

const fonts = { Hand: '"Toolbar Hand", cursive', Sans: 'Arial, sans-serif', Serif: 'Georgia, serif', Mono: 'monospace' };
const swatches = Array.from({ length: 13 }, (_, row) =>
  Array.from({ length: 13 }, (_, column) => {
    const x = (column - 6) * 14.2 + (row % 2 ? 7.1 : 0);
    const y = (row - 6) * 12.3;
    if (x * x + y * y > 82 * 82) return null;
    const angle = Math.atan2(y, x) * 180 / Math.PI;
    const hue = angle >= 0 ? 360 - angle * 4 / 3 : -angle * 2 / 3;
    return { x: x + 120, y: y + 120, color: `hsl(${hue.toFixed(0)} 85% ${Math.max(37, 79 - (y + 82) / 164 * 36).toFixed(0)}%)` };
  }).filter(item => item !== null)
).flat();

export default function TextToolbar({
  toolbarOnly = false,
}: {
  toolbarOnly?: boolean;
} = {}) {
  const [format, setFormat] = useState<string[]>([]);
  const [size, setSize] = useState(22);
  const [align, setAlign] = useState("center");
  const [font, setFont] = useState<keyof typeof fonts>("Hand");
  const [color, setColor] = useState("");
  const [linkOpen, setLinkOpen] = useState(false);
  const [mentionOpen, setMentionOpen] = useState(false);
  const [mentionName, setMentionName] = useState("");
  const [url, setUrl] = useState("");
  const [linkError, setLinkError] = useState("");
  const [message, setMessage] = useState("");
  const editor = useRef<HTMLDivElement>(null);
  const textArea = useRef<HTMLDivElement>(null);
  const [selectionBox, setSelectionBox] = useState<{ startLeft: number; startTop: number; startHeight: number; endLeft: number; endTop: number; endHeight: number } | null>(null);
  const selection = useRef<Range | null>(null);
  const fontBeforeCode = useRef<string>(fonts.Hand);

  function measureSelection(range: Range) {
    const parent = textArea.current?.getBoundingClientRect();
    const rects = Array.from(range.getClientRects()).filter(rect => rect.width > 0 && rect.height > 0);
    const first = rects[0];
    const last = rects[rects.length - 1];
    if (parent && first && last && !range.collapsed) setSelectionBox({ startLeft: first.left - parent.left, startTop: first.top - parent.top, startHeight: first.height, endLeft: last.right - parent.left, endTop: last.top - parent.top, endHeight: last.height });
    else setSelectionBox(null);
  }

  function saveSelection() {
    const current = window.getSelection();
    if (current?.rangeCount && editor.current?.contains(current.anchorNode) && editor.current.contains(current.focusNode)) {
      selection.current = current.getRangeAt(0).cloneRange();
      measureSelection(selection.current);
      const range = selection.current;
      const walker = document.createTreeWalker(editor.current, NodeFilter.SHOW_TEXT);
      let node: Node | null = null;
      while ((node = walker.nextNode())) {
        if (!range.intersectsNode(node) || !node.textContent?.length) continue;
        if (node === range.startContainer && range.startOffset === node.textContent.length) continue;
        if (node === range.endContainer && range.endOffset === 0) continue;
        break;
      }
      const element = node?.parentElement;
      if (element) {
        const computed = getComputedStyle(element);
        const active = [];
        if (Number(computed.fontWeight) >= 600) active.push("bold");
        if (computed.fontStyle === "italic") active.push("italic");
        if (computed.fontFamily.includes("monospace")) active.push("code");
        // Decorations and backgrounds can be painted by a parent span.
        let ancestor: HTMLElement | null = element;
        while (ancestor && ancestor !== editor.current) {
          const style = getComputedStyle(ancestor);
          if (style.textDecorationLine.includes("underline") && !active.includes("underline")) active.push("underline");
          if (style.textDecorationLine.includes("line-through") && !active.includes("strike")) active.push("strike");
          if (!["rgba(0, 0, 0, 0)", "transparent"].includes(style.backgroundColor) && !active.includes("highlight")) active.push("highlight");
          ancestor = ancestor.parentElement;
        }
        setFormat(active);
        setSize(Math.round(parseFloat(computed.fontSize) / 1.5));
        setFont(computed.fontFamily.includes("Toolbar Hand") ? "Hand" : computed.fontFamily.includes("monospace") ? "Mono" : computed.fontFamily.includes("Georgia") ? "Serif" : "Sans");
        setColor(computed.color);
        setAlign(["center", "right"].includes(computed.textAlign) ? computed.textAlign : "left");
      }
    }
  }

  useEffect(() => {
    const target = editor.current;
    if (!target) return;
    const range = document.createRange();
    range.selectNodeContents(target.querySelector("[data-quote]") ?? target);
    selection.current = range;
    const refresh = () => { if (selection.current) measureSelection(selection.current); };
    void document.fonts.ready.then(refresh);
    document.addEventListener("selectionchange", saveSelection);
    window.addEventListener("resize", refresh);
    return () => {
      document.removeEventListener("selectionchange", saveSelection);
      window.removeEventListener("resize", refresh);
    };
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => { if (selection.current) measureSelection(selection.current); });
    return () => cancelAnimationFrame(frame);
  }, [align]);

  function applyStyle(patch: Partial<CSSStyleDeclaration>) {
    const target = editor.current;
    if (!target) return;
    let range = selection.current;
    if (!range || range.collapsed || !target.contains(range.commonAncestorContainer)) {
      const node = range?.startContainer;
      const element = node?.nodeType === Node.TEXT_NODE ? node.parentElement : node as HTMLElement | undefined;
      range = document.createRange();
      range.selectNodeContents(element?.closest("p") ?? target.querySelector("[data-quote]") ?? target);
    }
    const styleRange = (part: Range) => {
      // Lift complete wrappers so switching a style off also removes its old value.
      let wrapper = part.commonAncestorContainer.nodeType === Node.TEXT_NODE ? part.commonAncestorContainer.parentElement : part.commonAncestorContainer as HTMLElement;
      while (wrapper && wrapper !== target && wrapper.tagName === "SPAN" && part.toString() === wrapper.textContent) {
        part.selectNode(wrapper);
        wrapper = wrapper.parentElement;
      }
      const fragment = part.extractContents();
      fragment.querySelectorAll<HTMLElement>("span").forEach(node => {
        Object.assign(node.style, Object.fromEntries(Object.keys(patch).map(property => [property, ""])));
      });
      const span = document.createElement("span");
      Object.assign(span.style, patch);
      span.appendChild(fragment);
      part.insertNode(span);
      return span;
    };
    // Format each selected text run, preserving paragraph structure across selections.
    const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
    const parts: Range[] = [];
    let node: Node | null;
    while ((node = walker.nextNode())) {
      if (!range.intersectsNode(node) || !node.textContent?.length) continue;
      const part = document.createRange();
      part.setStart(node, node === range.startContainer ? range.startOffset : 0);
      part.setEnd(node, node === range.endContainer ? range.endOffset : node.textContent.length);
      if (!part.collapsed) parts.push(part);
    }
    const spans = parts.reverse().map(styleRange).reverse();
    if (!spans.length) return;
    range = document.createRange();
    range.setStartBefore(spans[0]);
    range.setEndAfter(spans[spans.length - 1]);
    selection.current = range.cloneRange();
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
    const updatedRange = range;
    requestAnimationFrame(() => measureSelection(updatedRange));
  }

  function updateFormat(next: string[]) {
    const changed = [...format, ...next].find(value => format.includes(value) !== next.includes(value));
    const active = changed ? next.includes(changed) : false;
    if (changed === "bold") applyStyle({ fontWeight: active ? "700" : "400" });
    if (changed === "italic") applyStyle({ fontStyle: active ? "italic" : "normal" });
    if (changed === "underline" || changed === "strike") applyStyle({ textDecoration: [next.includes("underline") ? "underline" : "", next.includes("strike") ? "line-through" : ""].filter(Boolean).join(" ") || "none" });
    if (changed === "code") {
      if (active) fontBeforeCode.current = fonts[font === "Mono" ? "Sans" : font];
      applyStyle({ fontFamily: active ? fonts.Mono : fontBeforeCode.current });
    }
    if (changed === "highlight") applyStyle({ backgroundColor: active ? "#fff0a6" : "transparent" });
    setFormat(next);
  }

  function updateSize(value: number) {
    const next = Math.min(72, Math.max(12, value));
    setSize(next);
    applyStyle({ fontSize: `${next * 1.5}px` });
  }

  function updateColor(value: string) {
    setColor(value);
    applyStyle({ color: value });
  }

  function dragHandle(event: ReactPointerEvent<HTMLButtonElement>, edge: "start" | "end") {
    event.preventDefault();
    const range = selection.current?.cloneRange();
    if (!range) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const handle = event.currentTarget;
    const move = (pointer: PointerEvent) => {
      const caret = document.caretPositionFromPoint(pointer.clientX, pointer.clientY);
      if (!caret || !editor.current?.contains(caret.offsetNode)) return;
      const point = document.createRange();
      point.setStart(caret.offsetNode, caret.offset);
      point.collapse(true);
      const boundary = range.cloneRange();
      boundary.collapse(edge !== "start");
      const comparison = point.compareBoundaryPoints(Range.START_TO_START, boundary);
      if (edge === "start" && comparison < 0) range.setStart(caret.offsetNode, caret.offset);
      if (edge === "end" && comparison > 0) range.setEnd(caret.offsetNode, caret.offset);
      selection.current = range.cloneRange();
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      measureSelection(range);
    };
    const finish = () => { handle.removeEventListener("pointermove", move); handle.removeEventListener("pointerup", finish); handle.removeEventListener("pointercancel", finish); };
    handle.addEventListener("pointermove", move);
    handle.addEventListener("pointerup", finish);
    handle.addEventListener("pointercancel", finish);
  }

  function insertMention() {
    if (!mentionName.trim()) return;
    if (!editor.current) return;
    editor.current.focus();
    const range = selection.current && editor.current.contains(selection.current.commonAncestorContainer) ? selection.current : document.createRange();
    if (!selection.current) { range.selectNodeContents(editor.current); range.collapse(false); }
    range.deleteContents();
    const text = document.createTextNode(`@${mentionName.trim().replace(/^@/, "")} `);
    range.insertNode(text);
    range.setStartAfter(text);
    range.collapse(true);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
    selection.current = range.cloneRange();
    setMentionOpen(false);
    setMentionName("");
    setSelectionBox(null);
  }

  function applyLink() {
    let parsed: URL;
    try { parsed = new URL(url); } catch { setLinkError("Enter a full URL, such as https://example.com"); return; }
    if (!["https:", "http:"].includes(parsed.protocol)) { setLinkError("Use an https:// or http:// link."); return; }
    const target = editor.current;
    if (!target) return;
    const range = selection.current && target.contains(selection.current.commonAncestorContainer) ? selection.current : document.createRange();
    if (!selection.current || range.collapsed) range.selectNodeContents(target);
    const anchor = document.createElement("a");
    anchor.href = parsed.href;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.appendChild(range.extractContents());
    range.insertNode(anchor);
    selection.current = null;
    setLinkOpen(false);
    setMessage("Link applied. Select the linked text to edit it.");
  }

  function updateAlignment(value: string) {
    if (!value) return;
    setAlign(value);
    editor.current?.querySelectorAll<HTMLElement>("p").forEach(paragraph => {
      if (selection.current?.intersectsNode(paragraph)) paragraph.style.textAlign = value;
    });
  }

  return (
    <div className={toolbarOnly ? "relative w-full max-w-[400px] text-[#41413f] dark:text-[#d4d4d0]" : "relative w-full max-w-[800px] pt-[260px] text-[#41413f] dark:text-[#d4d4d0] max-[480px]:pt-[245px]"} ref={textArea}>
      <div className={toolbarOnly ? "w-full max-w-[400px]" : "absolute left-1/2 top-0 z-[5] w-full max-w-[400px] -translate-x-1/2 max-[480px]:max-w-[360px]"}>
        <div className="rounded-[23px] border border-[#e2e2e0] bg-[#ffffffed] p-[10px] shadow-[0_2px_3px_#00000006,0_7px_12px_#00000009,0_18px_36px_#0000000a] [&_button]:flex [&_button]:min-w-0 [&_button]:cursor-pointer [&_button]:items-center [&_button]:justify-center [&_button]:rounded-[9px] [&_button]:border [&_button]:border-transparent [&_button]:bg-transparent [&_button]:p-0 [&_button]:text-inherit [&_button_svg]:size-5 [&_button_svg]:stroke-[1.9] [&_button:hover]:bg-[#eaeae7] [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-2 [&_button:focus-visible]:outline-[#95958c] [&_button[data-state=on]]:border-[#e5e5e2] [&_button[data-state=on]]:bg-[linear-gradient(135deg,#fff,#fafafa)] [&_button[data-state=on]]:text-[#171715] [&_button[data-state=on]]:shadow-[0_1px_2px_#00000004] dark:border-[#424244] dark:bg-[#242426f5] dark:shadow-[0_2px_3px_#0002,0_10px_30px_#0003] dark:[&_button:hover]:bg-[#3d3d3f] dark:[&_button[data-state=on]]:border-[#525255] dark:[&_button[data-state=on]]:bg-[linear-gradient(135deg,#444447,#39393c)] dark:[&_button[data-state=on]]:text-[#fafaf5] max-[480px]:rounded-[22px] max-[480px]:p-[9px] max-[480px]:[&_button_svg]:size-[18px]" onPointerDownCapture={saveSelection} role="toolbar" aria-label="Text formatting" aria-orientation="horizontal">
          <div className="grid grid-cols-[242fr_376fr] gap-[10px] max-[480px]:gap-2">
            <div className="relative aspect-square overflow-hidden rounded-[15px] bg-[#f5f5f4] bg-[radial-gradient(#d8d8d5_1.5px,transparent_2px)] [background-size:8px_8px] [&_svg]:block [&_svg]:size-full [&_circle]:cursor-pointer [&_circle:focus-visible]:stroke-[#333] [&_circle:focus-visible]:stroke-[3px] [&_circle:focus-visible]:outline-none [&_input]:absolute [&_input]:bottom-[9px] [&_input]:right-[9px] [&_input]:size-5 [&_input]:cursor-pointer [&_input]:overflow-hidden [&_input]:rounded-full [&_input]:border-2 [&_input]:border-white [&_input]:p-0 [&_input]:opacity-0 hover:[&_input]:opacity-100 focus-within:[&_input]:opacity-100 dark:bg-[#2e2e30] dark:bg-[radial-gradient(#49494b_1.5px,transparent_2px)]">
              <svg viewBox="0 0 240 240" role="group" aria-label="Text color palette">
                <defs><filter id="toolbar-palette-shadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="7" stdDeviation="5" floodOpacity=".16" /></filter></defs>
                <g filter="url(#toolbar-palette-shadow)">{swatches.map((swatch, i) => <circle key={i} cx={swatch.x} cy={swatch.y} r="10.8" fill={swatch.color} role="button" tabIndex={0} aria-label={`Set text color ${swatch.color}`} aria-pressed={color === swatch.color} onClick={() => updateColor(swatch.color)} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); updateColor(swatch.color); } }} stroke={color === swatch.color ? "#fff" : "none"} strokeWidth="2.5" />)}</g>
              </svg>
              <input type="color" value={color.startsWith("#") ? color : "#222222"} onChange={event => updateColor(event.target.value)} aria-label="Choose a custom text color" title="Custom color" />
            </div>
            <div className="grid grid-rows-[2fr_1fr] rounded-[15px] bg-[#f5f5f4] px-[7px] py-[5px] dark:bg-[#2e2e30]">
              <ToggleGroup.Root type="multiple" value={format} onValueChange={updateFormat} className="grid grid-cols-3 grid-rows-2" aria-label="Text styles">
                <ToggleGroup.Item value="bold" aria-label="Bold" title="Bold"><Bold /></ToggleGroup.Item>
                <ToggleGroup.Item value="italic" aria-label="Italic" title="Italic"><Italic /></ToggleGroup.Item>
                <ToggleGroup.Item value="underline" aria-label="Underline" title="Underline"><Underline /></ToggleGroup.Item>
                <ToggleGroup.Item value="strike" aria-label="Strikethrough" title="Strikethrough"><Strikethrough /></ToggleGroup.Item>
                <ToggleGroup.Item value="code" aria-label="Code" title="Code"><CodeXml /></ToggleGroup.Item>
                <ToggleGroup.Item value="highlight" aria-label="Highlight" title="Highlight"><Highlighter /></ToggleGroup.Item>
              </ToggleGroup.Root>
              <div className="grid grid-cols-3">
                <Popover.Root open={linkOpen} onOpenChange={open => { setLinkOpen(open); setLinkError(""); }}>
                  <Popover.Trigger aria-label="Add link" title="Add link" onPointerDown={saveSelection}><Link /></Popover.Trigger>
                  <Popover.Portal><Popover.Content className="z-50 w-[min(320px,calc(100vw-32px))] rounded-[17px] border border-[#e2e2de] bg-white p-4 font-[Arial,sans-serif] text-[#41413f] shadow-[0_8px_25px_#00000014] [&_label]:mb-[9px] [&_label]:block [&_label]:text-[13px] [&_form>div]:flex [&_form>div]:gap-[7px] [&_input]:w-full [&_input]:min-w-0 [&_input]:rounded-lg [&_input]:border [&_input]:border-[#ddd] [&_input]:bg-transparent [&_input]:p-[5px] [&_input]:text-[13px] [&_button]:grid [&_button]:w-[37px] [&_button]:shrink-0 [&_button]:cursor-pointer [&_button]:place-items-center [&_button]:rounded-lg [&_button]:border-0 [&_button]:bg-[#f1f1ee] [&_p]:mb-0 [&_p]:mt-2 [&_p]:text-xs [&_p]:text-[#c64747] [&_input:focus-visible]:outline-2 [&_input:focus-visible]:outline-offset-2 [&_input:focus-visible]:outline-[#95958c] [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-2 [&_button:focus-visible]:outline-[#95958c] dark:border-[#444448] dark:bg-[#29292c] dark:text-[#e8e8e2] dark:[&_button]:bg-[#3b3b3e] dark:[&_input]:border-[#505054]" sideOffset={12} collisionPadding={16} aria-label="Insert link">
                    <form onSubmit={event => { event.preventDefault(); applyLink(); }}><label htmlFor="toolbar-url">Link address</label><div><input id="toolbar-url" type="url" placeholder="https://example.com" value={url} onChange={event => setUrl(event.target.value)} required /><button type="submit" aria-label="Apply link"><Check size={18} /></button></div>{linkError && <p role="alert">{linkError}</p>}</form>
                  </Popover.Content></Popover.Portal>
                </Popover.Root>
                <Popover.Root open={mentionOpen} onOpenChange={setMentionOpen}>
                  <Popover.Trigger aria-label="Insert mention" title="Insert mention"><AtSign /></Popover.Trigger>
                  <Popover.Portal><Popover.Content className="z-50 w-[min(320px,calc(100vw-32px))] rounded-[17px] border border-[#e2e2de] bg-white p-4 font-[Arial,sans-serif] text-[#41413f] shadow-[0_8px_25px_#00000014] [&_label]:mb-[9px] [&_label]:block [&_label]:text-[13px] [&_form>div]:flex [&_form>div]:gap-[7px] [&_input]:w-full [&_input]:min-w-0 [&_input]:rounded-lg [&_input]:border [&_input]:border-[#ddd] [&_input]:bg-transparent [&_input]:p-[5px] [&_input]:text-[13px] [&_button]:grid [&_button]:w-[37px] [&_button]:shrink-0 [&_button]:cursor-pointer [&_button]:place-items-center [&_button]:rounded-lg [&_button]:border-0 [&_button]:bg-[#f1f1ee] [&_p]:mb-0 [&_p]:mt-2 [&_p]:text-xs [&_p]:text-[#c64747] [&_input:focus-visible]:outline-2 [&_input:focus-visible]:outline-offset-2 [&_input:focus-visible]:outline-[#95958c] [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-2 [&_button:focus-visible]:outline-[#95958c] dark:border-[#444448] dark:bg-[#29292c] dark:text-[#e8e8e2] dark:[&_button]:bg-[#3b3b3e] dark:[&_input]:border-[#505054]" sideOffset={12} collisionPadding={16} aria-label="Mention someone">
                    <form onSubmit={event => { event.preventDefault(); insertMention(); }}><label htmlFor="toolbar-mention">Mention someone</label><div><input id="toolbar-mention" placeholder="e.g. Eduardo" value={mentionName} onChange={event => setMentionName(event.target.value)} maxLength={60} required /><button type="submit" aria-label="Add mention"><Check size={18} /></button></div></form>
                  </Popover.Content></Popover.Portal>
                </Popover.Root>
                <button type="button" aria-label="Reset formatting" title="Reset formatting" onClick={() => { setFormat([]); setColor(""); setSize(16); setFont("Sans"); applyStyle({ fontWeight: "400", fontStyle: "normal", textDecoration: "none", fontFamily: fonts.Sans, fontSize: "24px", color: "inherit", backgroundColor: "transparent" }); setMessage("Formatting reset."); }}><RemoveFormatting /></button>
              </div>
            </div>
          </div>
          <div className="mt-[10px] grid grid-cols-[164fr_220fr_220fr] gap-[9px] max-[480px]:mt-2 max-[480px]:gap-[7px]">
            <div className="flex min-h-[51px] items-center justify-center rounded-[15px] bg-[#f5f5f4] p-[5px] [&_button]:h-[34px] [&_button]:w-6 [&_button]:shrink-0 [&_button_svg]:size-[17px] [&_button:disabled]:cursor-default [&_button:disabled]:opacity-30 [&_input]:w-[30px] [&_input]:min-w-0 [&_input]:appearance-[textfield] [&_input]:border-0 [&_input]:bg-transparent [&_input]:p-0 [&_input]:text-center [&_input]:font-[Arial,sans-serif] [&_input]:text-[17px] [&_input]:text-inherit [&_input]:outline-none [&_input::-webkit-inner-spin-button]:m-0 [&_input::-webkit-inner-spin-button]:appearance-none [&_input::-webkit-outer-spin-button]:m-0 [&_input::-webkit-outer-spin-button]:appearance-none [&_input:focus-visible]:rounded [&_input:focus-visible]:outline [&_input:focus-visible]:outline-[#aaa] dark:bg-[#2e2e30] dark:[&_input]:text-[#eeeeeb] dark:[&_input]:[color-scheme:dark] max-[480px]:min-h-12 max-[480px]:p-[3px] max-[480px]:[&_input]:w-[25px] max-[480px]:[&_input]:text-base max-[480px]:[&_button]:w-[22px]">
              <button type="button" aria-label="Decrease text size" disabled={size <= 12} onClick={() => updateSize(size - 1)}><Minus /></button>
              <input type="number" aria-label="Text size" min={12} max={72} value={size} onChange={event => { const value = Number(event.target.value); if (Number.isFinite(value)) updateSize(value); }} />
              <button type="button" aria-label="Increase text size" disabled={size >= 72} onClick={() => updateSize(size + 1)}><Plus /></button>
            </div>
            <ToggleGroup.Root className="flex min-h-[51px] items-center justify-center gap-[2px] rounded-[15px] bg-[#f5f5f4] p-1 [&_button]:h-[43px] [&_button]:flex-1 dark:bg-[#2e2e30] max-[480px]:min-h-12 max-[480px]:[&_button]:h-10" type="single" value={align} onValueChange={updateAlignment} aria-label="Text alignment">
              <ToggleGroup.Item value="left" aria-label="Align left"><AlignLeft /></ToggleGroup.Item><ToggleGroup.Item value="center" aria-label="Align center"><AlignCenter /></ToggleGroup.Item><ToggleGroup.Item value="right" aria-label="Align right"><AlignRight /></ToggleGroup.Item>
            </ToggleGroup.Root>
            <DropdownMenu.Root><DropdownMenu.Trigger className="flex min-h-[51px] w-full items-center justify-center gap-[10px] rounded-[15px]! bg-[#f5f5f4]! [&>span]:text-2xl [&>span]:leading-none [&>svg]:size-4! [&>svg]:text-[#85857e] dark:bg-[#2e2e30]! max-[480px]:min-h-12" aria-label={`Font: ${font}`}><span style={{ fontFamily: fonts[font] }}>{font}</span><ChevronDown /></DropdownMenu.Trigger>
              <DropdownMenu.Portal><DropdownMenu.Content className="z-50 w-[var(--radix-dropdown-menu-trigger-width)] min-w-[120px] rounded-xl border border-[#e2e2de] bg-white p-[5px] font-[Arial,sans-serif] text-[#41413f] shadow-[0_8px_25px_#00000014] dark:border-[#444448] dark:bg-[#29292c] dark:text-[#e8e8e2]" sideOffset={10} collisionPadding={16} align="end"><DropdownMenu.RadioGroup value={font} onValueChange={value => { setFont(value as keyof typeof fonts); applyStyle({ fontFamily: fonts[value as keyof typeof fonts] }); }}>{Object.entries(fonts).map(([name, family]) => <DropdownMenu.RadioItem key={name} value={name} style={{ fontFamily: family }} className="flex cursor-pointer items-center justify-between rounded-[7px] px-[9px] py-[7px] text-base leading-5 outline-none data-highlighted:bg-[#f2f2ef] dark:data-highlighted:bg-[#3b3b3e]">{name}<DropdownMenu.ItemIndicator><Check size={15} /></DropdownMenu.ItemIndicator></DropdownMenu.RadioItem>)}</DropdownMenu.RadioGroup></DropdownMenu.Content></DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>
      </div>
      {!toolbarOnly && (
        <>
          <article className="m-0 w-full" aria-label="Document preview">
            <div ref={editor} role="textbox" aria-label="Editable document" aria-multiline="true" contentEditable suppressContentEditableWarning spellCheck={false} className="w-full text-2xl leading-[1.7] text-[#747471] outline-none [font-family:Arial,sans-serif] [overflow-wrap:anywhere] [caret-color:currentColor] [&_a]:text-inherit [&_a]:underline [&_p]:mb-[22px] [&_p]:mt-0 [&_p:last-child]:mb-0 selection:bg-[#24242212] dark:text-[#a6a6a1] dark:selection:bg-[#ffffff18] max-[480px]:text-xl" onPointerUp={saveSelection} onKeyUp={saveSelection} onBlur={saveSelection} onInput={() => { selection.current = null; setSelectionBox(null); }}>
              <p>The best ideas usually start as a few words in the margin. Give them a little room, and they become something worth sharing.</p>
              <p data-quote className="my-[22px]! text-center text-[33px] leading-[1.4] text-[#292927] [font-family:'Toolbar_Hand',cursive] dark:text-[#e8e8e2]">Make room for a little wonder.</p>
              <p>A notebook, an open window, a quiet afternoon. Sometimes that’s all it takes to see a familiar thing in a completely new way.</p>
              <p>Write it down while it’s still a little messy. Move the words around, find the right rhythm, and let the story take its own shape.</p>
            </div>
          </article>
          {selectionBox && <div className="pointer-events-none absolute inset-0 [&_button]:pointer-events-auto [&_button]:absolute [&_button]:size-7 [&_button]:touch-none [&_button]:cursor-ew-resize [&_button]:rounded-full [&_button]:border-0 [&_button]:bg-transparent [&_button]:p-0 [&_button]:before:absolute [&_button]:before:bottom-[14px] [&_button]:before:left-[13px] [&_button]:before:top-[14px] [&_button]:before:w-[2px] [&_button]:before:bg-[#272725] [&_button]:before:content-[''] [&_button]:after:absolute [&_button]:after:left-2 [&_button]:after:top-2 [&_button]:after:size-3 [&_button]:after:rounded-full [&_button]:after:bg-[#272725] [&_button]:after:content-[''] dark:[&_button]:before:bg-[#e5e5df] dark:[&_button]:after:bg-[#e5e5df]">
            <button className="" style={{ left: selectionBox.startLeft - 14, top: selectionBox.startTop - 14, height: selectionBox.startHeight + 28 }} type="button" aria-label="Drag selection start" onPointerDown={event => dragHandle(event, "start")} />
            <button className="after:bottom-2 after:top-auto!" style={{ left: selectionBox.endLeft - 14, top: selectionBox.endTop - 14, height: selectionBox.endHeight + 28 }} type="button" aria-label="Drag selection end" onPointerDown={event => dragHandle(event, "end")} />
          </div>}
        </>
      )}
      <p className="sr-only" role="status">{message}</p>
    </div>
  );
}
