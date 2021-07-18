module.exports = {
  algorithms: [
    {
      type: 'doc',
      id: 'algorithms/intro',
    },
    {
      type: 'category',
      label: 'Алгебра',
      items: [
        'algorithms/algebra/binary_pow',
        'algorithms/algebra/euler_function',
        'algorithms/algebra/euclid_algorithm',
        'algorithms/algebra/extended_euclid_algorithm',
      ],
    },
    {
      type: 'category',
      label: 'Геометрія',
      items: [
        'algorithms/geometry/length_of_segments_union',
      ],
    },
    {
      type: 'category',
      label: 'Графи',
      items: [
        {
          type: 'category',
          label: 'Базові алгоритми',
          collapsed: false,
          items: [
            'algorithms/graphs/dfs',
            'algorithms/graphs/bfs',
            'algorithms/graphs/topological_sort',
            'algorithms/graphs/connected_components',
          ],
        },
        {
          type: 'category',
          label: 'Мінімальнe каркасне дерево',
          collapsed: false,
          items: [
            'algorithms/graphs/mst/kruskal',
          ],
        },
      ],
    },
  ],
  courses: [
    {
      type: 'doc',
      id: 'courses/intro',
    },
  ],
};
