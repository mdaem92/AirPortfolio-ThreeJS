import styled from 'styled-components'

export const IntroContainer = styled.div`
.fullscreen { position:fixed;inset:0;z-index:100;overflow-y:auto;display:flex;align-items:center;justify-content:center;padding:32px;background:radial-gradient(ellipse at 50% 30%,#1b2b3c,#080f19 75%);transition:opacity .65s ease; }
.clicked { pointer-events:none;opacity:0; }
.boarding-pass { width:min(100%,1050px);color:#15202a;font:16px/1.55 Bahnschrift,Arial,sans-serif; }
.boarding-brand { color:#eadfc9;display:flex;align-items:center;gap:16px;letter-spacing:4px;font-size:13px;padding:0 4px 23px; }
.boarding-brand span { color:#e2ad59;font-size:33px; }
.ticket { display:grid;grid-template-columns:minmax(0,1fr) 245px;background:#f3e9d5;border:1px solid #cabfa9;border-radius:17px;box-shadow:0 30px 90px #0008;position:relative; }
.ticket-main { padding:37px 40px 27px; }
.ticket-kicker { font-size:11px;letter-spacing:3px;color:#6b5b47; }
.ticket h1 { font-size:clamp(34px,4.8vw,62px);font-weight:700;letter-spacing:-2px;line-height:1.04;margin:18px 0 14px;color:#15202a; }
.ticket-intro { max-width:580px;margin:0 0 29px;color:#424745;font-size:17px; }
.ticket-fields { display:grid;grid-template-columns:1fr 1.6fr;border-top:1px solid #ad9f89;padding-top:18px;gap:20px; }
.ticket-fields small,.ticket-stub small { display:block;font-size:10px;letter-spacing:3px;margin-bottom:6px; }
.ticket-fields strong { font-size:18px;line-height:1.2;display:block;font-weight:600; }
.ticket-footer { display:flex;justify-content:space-between;align-items:center;margin-top:27px;font-size:10px;letter-spacing:2px;color:#6b5b47;gap:12px; }
.ticket-stub { display:flex;flex-direction:column;align-items:stretch;text-align:center;padding:32px 24px 24px;border-left:2px dashed #b4a58e;position:relative; }
.ticket-stub::before,.ticket-stub::after { content:'';position:absolute;width:24px;height:24px;border-radius:50%;background:#101c2a;left:-13px; }
.ticket-stub::before { top:-13px; }.ticket-stub::after { bottom:-13px; }
.ticket-gate { font-size:78px;font-weight:700;line-height:1.05;letter-spacing:-4px; }
.ticket-flight { font-size:23px;font-weight:600;letter-spacing:2px;margin:10px 0 18px; }
.ticket-barcode { height:36px;width:100%;opacity:.8;background:repeating-linear-gradient(90deg,#14202b 0 2px,transparent 2px 4px,#14202b 4px 9px,transparent 9px 12px,#14202b 12px 13px,transparent 13px 17px);margin-bottom:22px; }
.boarding-start { margin-top:auto;background:#162a3c;border:1px solid #162a3c;border-radius:5px;padding:14px 9px;color:#fff3d9;font:600 14px/1.4 Bahnschrift,Arial,sans-serif;cursor:pointer;transition:background .2s,transform .2s; }
.boarding-start:hover:enabled { background:#29445c;transform:translateY(-2px); }.boarding-start:focus-visible { outline:3px solid #b77d26;outline-offset:5px; }
.boarding-start:disabled { opacity:.55;cursor:wait; }
.boarding-note { color:#9cabb9;font-size:12px;letter-spacing:.5px;text-align:center;margin:23px 0 0; }
@media(max-width:650px) {
.fullscreen { padding:24px 16px;align-items:safe center; }.boarding-brand { font-size:10px;letter-spacing:2px;padding-bottom:15px;gap:10px; }
.ticket { grid-template-columns:1fr; }.ticket-main { padding:25px 24px 20px; }.ticket h1 { font-size:44px; }.ticket-intro { font-size:15px;margin-bottom:21px; }
.ticket-fields { gap:14px; }.ticket-fields strong { font-size:15px; }.ticket-footer { margin-top:20px;font-size:9px; }
.ticket-stub { border-left:0;border-top:2px dashed #b4a58e;padding:19px 24px;display:grid;grid-template-columns:90px 1fr;gap:3px 24px;align-items:center;text-align:left; }
.ticket-stub::before { left:-13px;top:-13px; }.ticket-stub::after { left:auto;right:-13px;top:-13px;bottom:auto; }
.ticket-gate { font-size:52px; }.ticket-flight { font-size:15px;margin:0; }.ticket-barcode { height:22px;margin:5px 0 0; }
.boarding-start { grid-column:2;grid-row:1 / 4;align-self:stretch;margin:0;font-size:14px; }.boarding-note { margin-top:16px;font-size:11px; }
}
@media(prefers-reduced-motion:reduce) { .fullscreen,.boarding-start { transition:none; } }
`
