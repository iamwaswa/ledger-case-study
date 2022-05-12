import type { ReactNode } from "react";
import type { OrNull, OrUndefined } from "~/types";
import { strings } from "~/localization";
import { useDelayedTrueValue } from "~/hooks";
import { ErrorBoundary } from "~/utils/client";

export interface IRenderAsyncDataProps<DataType> {
  data: OrUndefined<DataType>;
  error: OrNull<Error>;
  loading: boolean;
  loadingStateDelay?: number;
  renderError?: ReactNode | ((error: Error) => JSX.Element);
  renderData: ReactNode | ((data: DataType) => JSX.Element);
  renderLoading?: ReactNode | (() => JSX.Element);
  renderNoData?: ReactNode | (() => JSX.Element);
}

function RenderAsyncDataComponent<DataType>({
  data,
  error,
  loading,
  loadingStateDelay = 500,
  renderData,
  renderError = (error: Error) => <>{error.message}</>,
  renderLoading = () => <>{strings.defaultLoadingMessage}</>,
  renderNoData = <></>,
}: IRenderAsyncDataProps<DataType>): JSX.Element {
  const showLoading = useDelayedTrueValue(loadingStateDelay);

  if (error) {
    return typeof renderError === `function` ? renderError(error) : renderError;
  }

  if (loading) {
    if (showLoading) {
      return typeof renderLoading === `function`
        ? renderLoading()
        : renderLoading;
    }

    return <></>;
  }

  if (!data) {
    return typeof renderNoData === `function` ? renderNoData() : renderNoData;
  }

  return typeof renderData === `function` ? renderData(data) : renderData;
}

function withErrorBoundary<DataType>(
  Component: (props: IRenderAsyncDataProps<DataType>) => JSX.Element
): (props: IRenderAsyncDataProps<DataType>) => JSX.Element {
  return (props: IRenderAsyncDataProps<DataType>): JSX.Element => {
    return (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

export const RenderAsyncData = withErrorBoundary(RenderAsyncDataComponent);
