import { IsObject, IsOptional, IsString } from 'class-validator';
import type { StoreWorkflowState } from '@clinic/store-operations';

export class EvaluateStoreTransitionDto {
  @IsString()
  transitionId!: string;

  @IsString()
  currentState!: StoreWorkflowState;

  @IsString()
  actorRole!: string;

  @IsObject()
  evidence!: Record<string, unknown>;

  @IsOptional()
  @IsString()
  humanApprovalId?: string;

  @IsOptional()
  @IsString()
  correlationId?: string;
}
