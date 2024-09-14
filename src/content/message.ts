/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName message.ts
 * @CreateDate  周六  09/14/2024
 * @Description 嵌入页面脚本的消息机制
 ****************************************************************************/

import { chrome } from 'a-edge-extends-types';

/** # 消息区
 *  由嵌入的脚本发送消息到后台脚本（原则上不直接发消息给弹出窗口）
 * - send            发送消息机制
 * - askRefresh      问询当前页面是否需要
 * - cancelRefresh   取消当前的消息
 * - suspendRefresh  暂停当前定时刷新
 * - restoreRefresh  恢复已暂停
 */
export const message = {
  /**  发送消息 */
  send(
    msg: { [key: string]: unknown },
    callback?: (result: unknown) => undefined,
  ) {
    if (typeof callback == 'function')
      chrome.runtime.sendMessage({ ...msg, from: 'contentJS' }, callback);
    else chrome.runtime.sendMessage({ ...msg, from: 'contentJS' });
  },
  /** 发现消息问询是否刷新 */
  askRefresh() {
    this.send({
      type: 'askRefresh',
      to: 'backgroundJS',
    });
  },
  /** 取消定时刷新 */
  cancelRefresh() {
    this.send({
      type: 'cancelRefresh',
      to: 'backgroundJS',
    });
  },
  /** 暂停当前定时刷新 */
  suspendRefresh() {
    this.send({
      type: 'suspendRefresh',
      to: 'backgroundJS',
    });
  },
  /** 恢复已暂停的刷新 */
  restoreRefresh() {
    this.send({
      type: 'restoreRefresh',
      to: 'backgroundJS',
    });
  },
};
