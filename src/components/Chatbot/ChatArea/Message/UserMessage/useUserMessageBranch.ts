export interface UseUserMessageBranchProps {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  childrenLength: number;
}
const useUserMessagebranch = ({
  selectedIndex,
  setSelectedIndex,
  childrenLength,
}: UseUserMessageBranchProps) => {
  const canGoPrev = selectedIndex > 0;
  const goPrev = () => setSelectedIndex(selectedIndex - 1);
  const canGoNext = selectedIndex < childrenLength - 1;
  const goNext = () => setSelectedIndex(selectedIndex + 1);

  return {
    selectedIndex,
    maxIndex: childrenLength - 1,
    canGoPrev,
    goPrev,
    canGoNext,
    goNext,
  };
};

export default useUserMessagebranch;
