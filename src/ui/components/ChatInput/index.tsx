"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../Button";
import Chip from "../Chip";
import Icon, { IconName } from "../Icon";
import Menu from "../Menu";
import { Text } from "../Text";

// ============================================================================
// Types
// ============================================================================

const chatInputVariants = cva(
  "w-full border border-tatva-border-secondary bg-tatva-surface-secondary p-tatva-4",
  {
    variants: {
      shadow: {
        true: "shadow-tatva-l1",
        false: "",
      },
      layout: {
        inline: "flex items-center gap-tatva-4 rounded-tatva-full",
        stacked: "flex flex-col gap-tatva-4 rounded-tatva-lg",
      },
    },
    defaultVariants: {
      shadow: false,
      layout: "inline",
    },
  }
);

export interface ChatInputSubmitData {
  /** The text content */
  text: string;
  /** Array of attached files */
  files: File[];
  /** Audio recording from voice input */
  audio?: Blob;
}

export interface ChatInputProps extends VariantProps<typeof chatInputVariants> {
  /** Current input value */
  value: string;
  /** Callback when input value changes */
  onChange: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;

  /** Commands to show on plus icon click (like AI mode, Research etc) */
  commands?: {
    label: string;
    icon: IconName;
    onClick: () => void;
  }[];

  /** Attached Items like modes, links, etc (not files - those are handled internally) */
  attachedItems?: {
    label: string;
    icon: IconName;
    type: "mode" | "link";
    onClick: () => void;
  }[];

  /** Accepted file types for upload (e.g., "image/*,.pdf"). Shows attachment button when provided. */
  acceptedFileTypes?: string;

  /** Maximum number of files allowed */
  maxFiles?: number;

  /** Callback for microphone button click (shows button when provided). If not provided but enableVoiceRecording is true, built-in recording is used. */
  onMicrophoneClick?: () => void;

  /** Enable built-in voice recording with waveform visualization. When true and onMicrophoneClick is not provided, clicking mic starts recording. */
  enableVoiceRecording?: boolean;

  /** Callback for submit/send - receives both text and files */
  onSubmit?: (data: ChatInputSubmitData) => void;

  /** Show shadow */
  shadow?: boolean;

  /** Disable the input */
  disabled?: boolean;

  /** Maximum height for the input area (only applies when multiline) */
  maxHeight?: number;
}

// ============================================================================
// Helper to get file extension
// ============================================================================

function getFileExtension(filename: string): string {
  const ext = filename.split(".").pop();
  return ext ? ext.toUpperCase() : "FILE";
}

// ============================================================================
// Waveform Visualizer Component
// ============================================================================

interface WaveformVisualizerProps {
  analyser?: AnalyserNode | null;
  isRecording?: boolean;
  audioBlob?: Blob | null;
  isPlaying?: boolean;
}

const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  analyser,
  isRecording,
  audioBlob,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const animationRef = React.useRef<number | null>(null);
  const [staticWaveform, setStaticWaveform] = React.useState<number[]>([]);

  // Get brand color
  const getBrandColor = () => {
    const brandColorRGB =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--tatva-brand-content-primary")
        .trim() || "99 102 241";
    return `rgb(${brandColorRGB.replace(/ /g, ", ")})`;
  };

  // Generate static waveform from audio blob
  React.useEffect(() => {
    if (!audioBlob) {
      setStaticWaveform([]);
      return;
    }

    const generateWaveform = async () => {
      try {
        const audioContext = new AudioContext();
        const arrayBuffer = await audioBlob.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        const channelData = audioBuffer.getChannelData(0);
        const samples = 200; // Number of samples for good resolution
        const blockSize = Math.floor(channelData.length / samples);
        const waveformData: number[] = [];

        for (let i = 0; i < samples; i++) {
          let sum = 0;
          const startIdx = i * blockSize;
          for (
            let j = 0;
            j < blockSize && startIdx + j < channelData.length;
            j++
          ) {
            sum += Math.abs(channelData[startIdx + j]);
          }
          waveformData.push(sum / blockSize);
        }

        // Normalize
        const max = Math.max(...waveformData);
        const normalized = waveformData.map((v) => (max > 0 ? v / max : 0));
        setStaticWaveform(normalized);

        audioContext.close();
      } catch (error) {
        console.error("Error generating waveform:", error);
      }
    };

    generateWaveform();
  }, [audioBlob]);

  // Draw static waveform
  React.useEffect(() => {
    if (!audioBlob || staticWaveform.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const displayWidth = rect.width;
    const displayHeight = rect.height;

    ctx.clearRect(0, 0, displayWidth, displayHeight);

    const barWidth = 2;
    const gap = 2;
    const totalBarWidth = barWidth + gap;
    // Fill entire width with bars
    const barCount = Math.floor(displayWidth / totalBarWidth);

    ctx.fillStyle = getBrandColor();

    for (let i = 0; i < barCount; i++) {
      // Sample from waveform data, wrapping if needed to fill the width
      const sampleIndex = Math.floor((i / barCount) * staticWaveform.length);
      const normalizedValue = staticWaveform[sampleIndex] || 0;

      const minHeight = 2;
      const maxHeight = displayHeight - 2;
      const barHeight = Math.max(minHeight, normalizedValue * maxHeight);

      const x = i * totalBarWidth;
      const y = (displayHeight - barHeight) / 2;

      ctx.fillRect(x, y, barWidth, barHeight);
    }
  }, [audioBlob, staticWaveform]);

  // Live recording animation
  React.useEffect(() => {
    if (!analyser || !isRecording || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const displayWidth = rect.width;
    const displayHeight = rect.height;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const brandColor = getBrandColor();

    const draw = () => {
      if (!isRecording) return;

      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, displayWidth, displayHeight);

      const barWidth = 2;
      const gap = 2;
      const barCount = Math.floor(displayWidth / (barWidth + gap));

      ctx.fillStyle = brandColor;

      for (let i = 0; i < barCount; i++) {
        const dataIndex = Math.floor((i / barCount) * bufferLength);
        const value = dataArray[dataIndex];
        const normalizedValue = value / 255;

        const minHeight = 2;
        const maxHeight = displayHeight - 2;
        const barHeight = Math.max(minHeight, normalizedValue * maxHeight);

        const x = i * (barWidth + gap);
        const y = (displayHeight - barHeight) / 2;

        ctx.fillRect(x, y, barWidth, barHeight);
      }
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [analyser, isRecording]);

  return <canvas ref={canvasRef} className="flex-1" style={{ height: 20 }} />;
};

// ============================================================================
// Component
// ============================================================================

const ChatInput = React.forwardRef<HTMLDivElement, ChatInputProps>(
  (
    {
      value,
      onChange,
      placeholder = "Ask anything...",
      commands,
      acceptedFileTypes,
      maxFiles = 10,
      onMicrophoneClick,
      enableVoiceRecording = false,
      onSubmit,
      shadow = false,
      disabled = false,
      maxHeight = 240,
      attachedItems,
    },
    ref
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [hasMultipleLines, setHasMultipleLines] = React.useState(false);
    const [isNearEnd, setIsNearEnd] = React.useState(false);
    const inlineWidthRef = React.useRef<number | null>(null);

    // Internal file state
    const [files, setFiles] = React.useState<File[]>([]);

    // Voice recording state
    const [isRecording, setIsRecording] = React.useState(false);
    const [recordedAudio, setRecordedAudio] = React.useState<Blob | null>(null);
    const [audioUrl, setAudioUrl] = React.useState<string | null>(null);
    const [isPlayingPreview, setIsPlayingPreview] = React.useState(false);
    const [analyser, setAnalyser] = React.useState<AnalyserNode | null>(null);
    const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
    const audioChunksRef = React.useRef<Blob[]>([]);
    const streamRef = React.useRef<MediaStream | null>(null);
    const audioContextRef = React.useRef<AudioContext | null>(null);
    const audioPreviewRef = React.useRef<HTMLAudioElement | null>(null);

    // Handle file input click
    const handleFileButtonClick = () => {
      fileInputRef.current?.click();
    };

    // Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files;
      if (selectedFiles && selectedFiles.length > 0) {
        const newFiles = Array.from(selectedFiles);
        setFiles((prev) => {
          const combined = [...prev, ...newFiles];
          // Limit to maxFiles
          return combined.slice(0, maxFiles);
        });
      }
      // Reset the input so the same file can be selected again
      e.target.value = "";
    };

    // Handle file removal
    const handleRemoveFile = (index: number) => {
      setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    // Start voice recording
    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        streamRef.current = stream;

        // Set up audio context and analyser for visualization
        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;
        const source = audioContext.createMediaStreamSource(stream);
        const analyserNode = audioContext.createAnalyser();
        analyserNode.fftSize = 256;
        source.connect(analyserNode);
        setAnalyser(analyserNode);

        // Set up media recorder
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });

          // Store audio for preview instead of immediately submitting
          setRecordedAudio(audioBlob);
          setAudioUrl(URL.createObjectURL(audioBlob));

          // Clean up recording resources (but keep the audio blob)
          cleanupRecording();
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Error starting recording:", error);
        cleanupRecording();
      }
    };

    // Stop voice recording
    const stopRecording = () => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
    };

    // Clean up recording resources
    const cleanupRecording = () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setAnalyser(null);
      mediaRecorderRef.current = null;
      audioChunksRef.current = [];
    };

    // Clear audio preview
    const clearAudioPreview = () => {
      if (audioPreviewRef.current) {
        audioPreviewRef.current.pause();
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      setRecordedAudio(null);
      setAudioUrl(null);
      setIsPlayingPreview(false);
    };

    // Toggle audio preview playback
    const toggleAudioPlayback = () => {
      if (!audioPreviewRef.current) return;

      if (isPlayingPreview) {
        audioPreviewRef.current.pause();
        setIsPlayingPreview(false);
      } else {
        audioPreviewRef.current.play();
        setIsPlayingPreview(true);
      }
    };

    // Submit recorded audio
    const handleAudioSubmit = () => {
      if (onSubmit && recordedAudio) {
        onSubmit({ text: value, files, audio: recordedAudio });
        setFiles([]);
        clearAudioPreview();
      }
    };

    // Discard recorded audio
    const handleAudioDiscard = () => {
      clearAudioPreview();
    };

    // Handle microphone button click
    const handleMicrophoneClick = () => {
      if (onMicrophoneClick) {
        // Use external handler if provided
        onMicrophoneClick();
      } else if (enableVoiceRecording) {
        // Use built-in recording
        if (isRecording) {
          stopRecording();
        } else {
          startRecording();
        }
      }
    };

    // Clean up on unmount
    React.useEffect(() => {
      return () => {
        cleanupRecording();
        if (audioUrl) {
          URL.revokeObjectURL(audioUrl);
        }
      };
    }, [audioUrl]);

    // Auto-resize textarea and detect multiple lines
    React.useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        // Reset height to measure actual content
        textarea.style.height = "auto";
        const scrollHeight = textarea.scrollHeight;
        const computedLineHeight = Number.parseFloat(
          window.getComputedStyle(textarea).lineHeight || "0"
        );
        const singleLineHeight =
          Number.isFinite(computedLineHeight) && computedLineHeight > 0
            ? computedLineHeight
            : 24; // Fallback for leading-6

        // Check if content spans multiple lines
        // Tolerance avoids flicker due to subpixel rounding
        setHasMultipleLines(scrollHeight > singleLineHeight + 2);

        // Set the height
        textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
      }
    }, [value, maxHeight]);

    // Handle submit
    const handleSubmit = () => {
      if (onSubmit && (value.trim() || files.length > 0)) {
        onSubmit({ text: value, files });
        // Clear files after submit
        setFiles([]);
      }
    };

    // Handle key down for submit
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey && onSubmit) {
        e.preventDefault();
        handleSubmit();
      }
    };

    const showAttachmentButton = !!acceptedFileTypes;
    const showMicrophoneButton = !!onMicrophoneClick || enableVoiceRecording;
    const hasTrailingIcons =
      showAttachmentButton || showMicrophoneButton || onSubmit;
    const hasAttachedItems = attachedItems && attachedItems.length > 0;
    const hasFiles = files.length > 0;
    const isStackedLayout =
      !isRecording &&
      (hasAttachedItems ||
        hasFiles ||
        (value.trim().length > 0 && (hasMultipleLines || isNearEnd)));

    // Capture inline textarea width so our "near end" logic doesn't oscillate when layout switches.
    React.useEffect(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      if (!isStackedLayout) {
        inlineWidthRef.current = textarea.clientWidth;
      }
    }, [isStackedLayout, value]);

    // Detect when text is close to wrapping (cursor reaching the end-like state)
    React.useEffect(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const trimmed = value.trim();
      if (!trimmed) {
        setIsNearEnd(false);
        return;
      }

      // If it already wrapped, "near end" no longer matters
      if (hasMultipleLines) {
        setIsNearEnd(false);
        return;
      }

      const computed = window.getComputedStyle(textarea);
      const fontStyle = computed.fontStyle || "normal";
      const fontVariant = computed.fontVariant || "normal";
      const fontWeight = computed.fontWeight || "400";
      const fontSize = computed.fontSize || "16px";
      const fontFamily = computed.fontFamily || "sans-serif";

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize} ${fontFamily}`;

      const singleLineText = value.replace(/\s+/g, " ");
      const textWidth = ctx.measureText(singleLineText).width;

      // Use a stable "inline width" reference to avoid oscillation when the layout changes.
      const effectiveWidth = inlineWidthRef.current ?? textarea.clientWidth;

      // Hysteresis: enter stacked a bit early, but only exit after the user deletes a fair bit.
      const enterThresholdPx = 24;
      const exitThresholdPx = 64;

      setIsNearEnd((prev) => {
        if (textWidth >= effectiveWidth - enterThresholdPx) return true;
        if (textWidth <= effectiveWidth - exitThresholdPx) return false;
        return prev;
      });
    }, [value, hasMultipleLines]);

    const canSubmit = value.trim().length > 0 || files.length > 0;

    // Recording UI layout
    if (isRecording) {
      return (
        <div
          ref={ref}
          className={chatInputVariants({
            shadow,
            layout: "inline",
          })}
        >
          {/* Plus button on the left */}
          {commands && (
            <div className="shrink-0">
              <Menu
                options={commands.map((command) => ({
                  label: command.label,
                  icon: command.icon,
                  onClick: command.onClick,
                }))}
                align="start"
                side="top"
              >
                <Button
                  variant="ghost"
                  size="md"
                  icon="plus"
                  disabled={disabled}
                />
              </Menu>
            </div>
          )}

          {/* Waveform visualizer */}
          <WaveformVisualizer analyser={analyser} isRecording={isRecording} />

          {/* Stop button on the right */}
          <Button
            variant="secondary"
            size="md"
            icon="stop"
            onClick={stopRecording}
            disabled={disabled}
          />
        </div>
      );
    }

    // Audio preview UI layout
    if (recordedAudio && audioUrl) {
      return (
        <div
          ref={ref}
          className={chatInputVariants({
            shadow,
            layout: "inline",
          })}
        >
          {/* Play/Pause button */}
          <Button
            variant="ghost"
            size="md"
            icon={isPlayingPreview ? "pause" : "play"}
            onClick={toggleAudioPlayback}
            disabled={disabled}
          />

          {/* Static waveform */}
          <WaveformVisualizer audioBlob={recordedAudio} />

          {/* Hidden audio element for playback */}
          <audio
            ref={audioPreviewRef}
            src={audioUrl}
            onEnded={() => setIsPlayingPreview(false)}
            className="hidden"
          />

          {/* Delete button */}
          <Button
            variant="ghost"
            size="md"
            icon="delete"
            onClick={handleAudioDiscard}
            disabled={disabled}
          />

          {/* Send button */}
          <Button
            variant="primary"
            size="md"
            icon="send"
            onClick={handleAudioSubmit}
            disabled={disabled}
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={chatInputVariants({
          shadow,
          layout: isStackedLayout ? "stacked" : "inline",
        })}
      >
        {/* File previews - shown above textarea when files exist */}
        {hasFiles && (
          <div className="flex flex-wrap gap-tatva-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="relative flex items-center gap-tatva-4 rounded-tatva-md border border-tatva-border-primary p-tatva-2"
              >
                <div className="flex size-tatva-30 items-center justify-center rounded-tatva-sm bg-tatva-background-secondary">
                  <Icon name="file" size="lg" tone="secondary" />
                </div>
                <div className="flex flex-col">
                  <span className="max-w-tatva-100">
                    <Text variant="body-sm" tone="default" lineClamp={1}>
                      {file.name}
                    </Text>
                  </span>
                  <Text variant="body-sm" tone="tertiary">
                    {getFileExtension(file.name)}
                  </Text>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="flex h-full w-tatva-16 items-start justify-end p-tatva-2 opacity-50 hover:opacity-100"
                  disabled={disabled}
                >
                  <Icon name="close" size="sm" tone="secondary" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Row 1: input area (always present) */}
        <div
          className={cn(
            "flex min-w-tatva-0",
            isStackedLayout ? "w-full" : "flex-1 items-center gap-tatva-4"
          )}
        >
          {!isStackedLayout && commands && (
            <div className="shrink-0">
              <Menu
                options={commands.map((command) => ({
                  label: command.label,
                  icon: command.icon,
                  onClick: command.onClick,
                }))}
                align="start"
                side="top"
              >
                <Button
                  variant="ghost"
                  size="md"
                  icon="plus"
                  disabled={disabled}
                />
              </Menu>
            </div>
          )}

          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className={cn(
              "w-full resize-none bg-transparent outline-none",
              "font-matter text-tatva-body-md leading-6 text-tatva-content-primary",
              "placeholder:text-tatva-content-tertiary",
              "disabled:cursor-not-allowed disabled:opacity-50",
              isStackedLayout ? "mx-tatva-4 mt-tatva-2" : ""
            )}
            style={{ maxHeight: `${maxHeight}px` }}
          />

          {!isStackedLayout && hasTrailingIcons && (
            <div className="flex items-center gap-tatva-4">
              {showAttachmentButton && (
                <Button
                  variant="ghost"
                  size="md"
                  icon="attachment"
                  onClick={handleFileButtonClick}
                  disabled={disabled || files.length >= maxFiles}
                />
              )}
              {showMicrophoneButton && (
                <Button
                  variant="ghost"
                  size="md"
                  icon="microphone"
                  onClick={handleMicrophoneClick}
                  disabled={disabled}
                />
              )}
              {onSubmit && (
                <Button
                  variant="primary"
                  size="md"
                  icon="send"
                  onClick={handleSubmit}
                  disabled={disabled || !canSubmit}
                />
              )}
            </div>
          )}
        </div>

        {/* Row 2: actions (only when stacked layout is active) */}
        {isStackedLayout && (commands || hasTrailingIcons) && (
          <div className="flex items-center gap-tatva-4">
            {commands && (
              <div className="shrink-0">
                <Menu
                  options={commands.map((command) => ({
                    label: command.label,
                    icon: command.icon,
                    onClick: command.onClick,
                  }))}
                  align="start"
                  side="top"
                >
                  <Button
                    variant="ghost"
                    size="md"
                    icon="plus"
                    disabled={disabled}
                  />
                </Menu>
              </div>
            )}

            {/* Attached items (modes, links - not files) */}
            {hasAttachedItems && (
              <div className="flex items-center gap-tatva-2">
                {attachedItems?.map((item) => (
                  <Chip
                    key={item.label}
                    variant="brand"
                    size="md"
                    icon={item.icon}
                    onRemove={item.onClick}
                  >
                    {item.label}
                  </Chip>
                ))}
              </div>
            )}

            <div className="flex-1" />

            {showAttachmentButton && (
              <Button
                variant="ghost"
                size="md"
                icon="attachment"
                onClick={handleFileButtonClick}
                disabled={disabled || files.length >= maxFiles}
              />
            )}
            {showMicrophoneButton && (
              <Button
                variant="ghost"
                size="md"
                icon="microphone"
                onClick={handleMicrophoneClick}
                disabled={disabled}
              />
            )}
            {onSubmit && (
              <Button
                variant="primary"
                size="md"
                icon="send"
                onClick={handleSubmit}
                disabled={disabled || !canSubmit}
              />
            )}
          </div>
        )}

        {/* Hidden file input */}
        {showAttachmentButton && (
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={acceptedFileTypes}
            multiple={maxFiles > 1}
            onChange={handleFileChange}
            disabled={disabled}
          />
        )}
      </div>
    );
  }
);

ChatInput.displayName = "ChatInput";

// ============================================================================
// Exports
// ============================================================================

export { ChatInput, chatInputVariants };
export default ChatInput;
