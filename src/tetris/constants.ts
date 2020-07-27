export const GameSpeed = 500;

export const BlockSize = 20;
export const BlockBevelWidth = 4;

export const FieldWidthBlocks = 10;
export const FieldHeightBlocks = 20;

export const FieldPadding = BlockSize;

export const FieldWidth = FieldWidthBlocks * BlockSize + 2 * FieldPadding;
export const FieldHeight = FieldHeightBlocks * BlockSize + 2 * FieldPadding;

export const DashboardWidthBlocks = 8;
export const DashboardHeightBlocks = FieldHeightBlocks;

export const NextHeightBlocks = 6;
export const NextHeight = NextHeightBlocks * BlockSize;

export const DashboardWidth = DashboardWidthBlocks * BlockSize;
export const ScoreboardHeight = FieldHeight - NextHeight - 3 * BlockSize;

export const DashBoardOffsetBlocks = FieldWidthBlocks + 2;

export const NextOffsetX = FieldWidth + FieldPadding;
export const NextOffsetY = FieldPadding;

export const ScoreboardOffsetX = FieldWidth + FieldPadding;
export const ScoreboardOffsetY = NextHeight + 2 * FieldPadding;

export const StageWidth = FieldWidth + DashboardWidth;
export const StageHeight = FieldHeight;
